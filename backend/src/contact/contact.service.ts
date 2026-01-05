import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactMessageDto, UpdateContactMessageDto } from './dto/contact-message.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async getAllMessages() {
    return this.prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getUnreadCount() {
    return this.prisma.contactMessage.count({
      where: { read: false },
    });
  }

  async createMessage(dto: CreateContactMessageDto) {
    return this.prisma.contactMessage.create({
      data: dto,
    });
  }

  async markAsRead(id: string) {
    return this.prisma.contactMessage.update({
      where: { id },
      data: { read: true },
    });
  }

  async deleteMessage(id: string) {
    return this.prisma.contactMessage.delete({
      where: { id },
    });
  }
}

