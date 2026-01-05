import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStatDto, UpdateStatDto } from './dto/stat.dto';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getAllStats() {
    return this.prisma.stat.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async getStatById(id: string) {
    const stat = await this.prisma.stat.findUnique({
      where: { id },
    });

    if (!stat) {
      throw new NotFoundException('Stat not found');
    }

    return stat;
  }

  async createStat(dto: CreateStatDto) {
    return this.prisma.stat.create({
      data: dto,
    });
  }

  async updateStat(id: string, dto: UpdateStatDto) {
    return this.prisma.stat.update({
      where: { id },
      data: dto,
    });
  }

  async deleteStat(id: string) {
    return this.prisma.stat.delete({
      where: { id },
    });
  }
}







