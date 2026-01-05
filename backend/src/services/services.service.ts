import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';

@Injectable()
export class ServicesService {
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

  private parseServiceItems(service: any) {
    return {
      ...service,
      items: this.safeParseJSON(service.items, []),
    };
  }

  async getAllServices() {
    const services = await this.prisma.service.findMany({
      orderBy: { order: 'asc' },
    });
    return services.map(s => this.parseServiceItems(s));
  }

  async getServiceById(id: string) {
    const service = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return this.parseServiceItems(service);
  }

  async createService(dto: CreateServiceDto) {
    const service = await this.prisma.service.create({
      data: dto,
    });
    return this.parseServiceItems(service);
  }

  async updateService(id: string, dto: UpdateServiceDto) {
    const service = await this.prisma.service.update({
      where: { id },
      data: dto,
    });
    return this.parseServiceItems(service);
  }

  async deleteService(id: string) {
    return this.prisma.service.delete({
      where: { id },
    });
  }
}






