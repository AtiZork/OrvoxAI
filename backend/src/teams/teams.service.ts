import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeamGroupDto, UpdateTeamGroupDto } from './dto/team-group.dto';
import { CreateTeamMemberDto, UpdateTeamMemberDto } from './dto/team-member.dto';

@Injectable()
export class TeamsService {
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

  private parseTeamMember(member: any) {
    if (!member) return member;
    return {
      ...member,
      skills: this.safeParseJSON(member.skills, []),
    };
  }

  private parseGroupWithMembers(group: any) {
    if (!group) return group;
    return {
      ...group,
      members: (group.members || []).map((member: any) => this.parseTeamMember(member)),
    };
  }

  // Team Groups
  async getAllGroups() {
    const groups = await this.prisma.teamGroup.findMany({
      include: {
        members: {
          include: {
            projects: {
              include: {
                project: true,
              },
            },
          },
        },
      },
      orderBy: { order: 'asc' },
    });
    return groups.map(g => this.parseGroupWithMembers(g));
  }

  async getGroupById(id: string) {
    const group = await this.prisma.teamGroup.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            projects: {
              include: {
                project: true,
              },
            },
          },
        },
      },
    });

    if (!group) {
      throw new NotFoundException('Team group not found');
    }

    return this.parseGroupWithMembers(group);
  }

  async createGroup(dto: CreateTeamGroupDto) {
    return this.prisma.teamGroup.create({
      data: dto,
    });
  }

  async updateGroup(id: string, dto: UpdateTeamGroupDto) {
    return this.prisma.teamGroup.update({
      where: { id },
      data: dto,
    });
  }

  async deleteGroup(id: string) {
    return this.prisma.teamGroup.delete({
      where: { id },
    });
  }

  // Team Members
  async getAllMembers() {
    const members = await this.prisma.teamMember.findMany({
      include: {
        group: true,
        projects: {
          include: {
            project: true,
          },
        },
      },
    });
    return members.map(m => this.parseTeamMember(m));
  }

  async getMemberBySlug(slug: string) {
    const member = await this.prisma.teamMember.findUnique({
      where: { slug },
      include: {
        group: true,
        projects: {
          include: {
            project: true,
          },
        },
      },
    });

    if (!member) {
      throw new NotFoundException('Team member not found');
    }

    return this.parseTeamMember(member);
  }

  async createMember(dto: CreateTeamMemberDto) {
    const member = await this.prisma.teamMember.create({
      data: dto,
      include: {
        group: true,
      },
    });
    return this.parseTeamMember(member);
  }

  async updateMember(id: string, dto: UpdateTeamMemberDto) {
    const member = await this.prisma.teamMember.update({
      where: { id },
      data: dto,
      include: {
        group: true,
      },
    });
    return this.parseTeamMember(member);
  }

  async deleteMember(id: string) {
    return this.prisma.teamMember.delete({
      where: { id },
    });
  }
}






