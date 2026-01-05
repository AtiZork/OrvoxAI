import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactMessageDto } from './dto/contact-message.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';

@Controller('api/contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  // Public endpoint for submitting contact form
  @Public()
  @Post()
  async createMessage(@Body() dto: CreateContactMessageDto) {
    return this.contactService.createMessage(dto);
  }

  // Admin endpoints
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllMessages() {
    return this.contactService.getAllMessages();
  }

  @UseGuards(JwtAuthGuard)
  @Get('unread-count')
  async getUnreadCount() {
    const count = await this.contactService.getUnreadCount();
    return { count };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/read')
  async markAsRead(@Param('id') id: string) {
    return this.contactService.markAsRead(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteMessage(@Param('id') id: string) {
    return this.contactService.deleteMessage(id);
  }
}

