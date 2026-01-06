import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAboutContentDto, UpdateAboutContentDto } from './dto/about-content.dto';

@Injectable()
export class AboutService {
  constructor(private prisma: PrismaService) {}

  async getAllContent() {
    return this.prisma.aboutContent.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async getContentById(id: string) {
    const content = await this.prisma.aboutContent.findUnique({
      where: { id },
    });

    if (!content) {
      throw new NotFoundException('About content not found');
    }

    return content;
  }

  async createContent(dto: CreateAboutContentDto) {
    return this.prisma.aboutContent.create({
      data: dto,
    });
  }

  async updateContent(id: string, dto: UpdateAboutContentDto) {
    return this.prisma.aboutContent.update({
      where: { id },
      data: dto,
    });
  }

  async deleteContent(id: string) {
    return this.prisma.aboutContent.delete({
      where: { id },
    });
  }
}








