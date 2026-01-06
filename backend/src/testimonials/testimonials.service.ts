import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTestimonialDto, UpdateTestimonialDto } from './dto/testimonial.dto';

@Injectable()
export class TestimonialsService {
  constructor(private prisma: PrismaService) {}

  async getAllTestimonials() {
    return this.prisma.testimonial.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async getTestimonialById(id: string) {
    const testimonial = await this.prisma.testimonial.findUnique({
      where: { id },
    });

    if (!testimonial) {
      throw new NotFoundException('Testimonial not found');
    }

    return testimonial;
  }

  async createTestimonial(dto: CreateTestimonialDto) {
    return this.prisma.testimonial.create({
      data: dto,
    });
  }

  async updateTestimonial(id: string, dto: UpdateTestimonialDto) {
    return this.prisma.testimonial.update({
      where: { id },
      data: dto,
    });
  }

  async deleteTestimonial(id: string) {
    return this.prisma.testimonial.delete({
      where: { id },
    });
  }
}








