import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  private safeParseJSON(jsonString: string | null | undefined, fallback: any = []): any {
    if (jsonString === null || jsonString === undefined) return fallback;
    if (typeof jsonString !== 'string') {
      // If it's already an array/object, return it
      if (Array.isArray(jsonString) || (typeof jsonString === 'object' && jsonString !== null)) {
        return jsonString;
      }
      return fallback;
    }
    if (jsonString.trim() === '') return fallback;
    try {
      const parsed = JSON.parse(jsonString);
      return parsed;
    } catch (error) {
      console.error('JSON parse error:', { jsonString, error });
      return fallback;
    }
  }

  private parseProject(project: any) {
    return {
      ...project,
      technologies: this.safeParseJSON(project.technologies, []),
    };
  }

  async getAllProjects(status?: string) {
    const where = status ? { status } : {};
    const projects = await this.prisma.project.findMany({
      where,
      include: {
        members: {
          include: {
            member: {
              include: {
                group: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return projects.map(p => this.parseProject(p));
  }

  async getProjectBySlug(slug: string) {
    const project = await this.prisma.project.findUnique({
      where: { slug },
      include: {
        members: {
          include: {
            member: {
              include: {
                group: true,
              },
            },
          },
        },
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return this.parseProject(project);
  }

  async createProject(dto: CreateProjectDto) {
    const { memberIds, ...projectData } = dto;

    const project = await this.prisma.project.create({
      data: projectData as any,
    });

    if (memberIds && memberIds.length > 0) {
      await this.prisma.projectMember.createMany({
        data: memberIds.map((memberId) => ({
          projectId: project.id,
          memberId,
        })),
      });
    }

    return this.getProjectBySlug(project.slug);
  }

  async updateProject(id: string, dto: UpdateProjectDto) {
    const { memberIds, ...projectData } = dto;

    await this.prisma.project.update({
      where: { id },
      data: projectData,
    });

    if (memberIds !== undefined) {
      // Delete existing relationships
      await this.prisma.projectMember.deleteMany({
        where: { projectId: id },
      });

      // Create new relationships
      if (memberIds.length > 0) {
        await this.prisma.projectMember.createMany({
          data: memberIds.map((memberId) => ({
            projectId: id,
            memberId,
          })),
        });
      }
    }

    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            member: {
              include: {
                group: true,
              },
            },
          },
        },
      },
    });
    return this.parseProject(project);
  }

  async deleteProject(id: string) {
    return this.prisma.project.delete({
      where: { id },
    });
  }
}






