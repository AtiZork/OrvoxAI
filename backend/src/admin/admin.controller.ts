import { Controller, Get, UseGuards, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  getAdminInfo() {
    return {
      message: 'Admin API is running',
      endpoints: {
        dashboard: '/admin/dashboard',
        upload: '/admin/upload/team',
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('dashboard')
  async getDashboard() {
    return this.adminService.getDashboardStats();
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload/team')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/team',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `team-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadTeamImage(@UploadedFile() file: Express.Multer.File) {
    return {
      url: `/uploads/team/${file.filename}`,
      filename: file.filename,
    };
  }
}






