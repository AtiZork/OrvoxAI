import { Controller, Get, UseGuards, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { multerImageStorage } from '../common/config/multer-storage';

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
      storage: multerImageStorage('team', 'team'),
    }),
  )
  async uploadTeamImage(@UploadedFile() file: Express.Multer.File) {
    return {
      url: `/uploads/team/${file.filename}`,
      filename: file.filename,
    };
  }
}






