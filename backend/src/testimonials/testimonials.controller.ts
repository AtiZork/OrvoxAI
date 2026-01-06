import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TestimonialsService } from './testimonials.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { CreateTestimonialDto, UpdateTestimonialDto } from './dto/testimonial.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('api/testimonials')
export class TestimonialsController {
  constructor(private testimonialsService: TestimonialsService) {}

  @Public()
  @Get()
  async getAllTestimonials() {
    return this.testimonialsService.getAllTestimonials();
  }

  @Public()
  @Get(':id')
  async getTestimonialById(@Param('id') id: string) {
    return this.testimonialsService.getTestimonialById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTestimonial(@Body() dto: CreateTestimonialDto) {
    return this.testimonialsService.createTestimonial(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateTestimonial(@Param('id') id: string, @Body() dto: UpdateTestimonialDto) {
    return this.testimonialsService.updateTestimonial(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTestimonial(@Param('id') id: string) {
    return this.testimonialsService.deleteTestimonial(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/testimonials',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `testimonial-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return {
      url: `/uploads/testimonials/${file.filename}`,
      filename: file.filename,
    };
  }
}








