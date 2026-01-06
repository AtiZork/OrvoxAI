import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AboutService } from './about.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { CreateAboutContentDto, UpdateAboutContentDto } from './dto/about-content.dto';

@Controller('api/about')
export class AboutController {
  constructor(private aboutService: AboutService) {}

  @Public()
  @Get()
  async getAllContent() {
    return this.aboutService.getAllContent();
  }

  @Public()
  @Get(':id')
  async getContentById(@Param('id') id: string) {
    return this.aboutService.getContentById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createContent(@Body() dto: CreateAboutContentDto) {
    return this.aboutService.createContent(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateContent(@Param('id') id: string, @Body() dto: UpdateAboutContentDto) {
    return this.aboutService.updateContent(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteContent(@Param('id') id: string) {
    return this.aboutService.deleteContent(id);
  }
}








