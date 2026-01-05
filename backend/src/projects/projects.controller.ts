import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';

@Controller('api/projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Public()
  @Get()
  async getAllProjects(@Query('status') status?: string) {
    return this.projectsService.getAllProjects(status);
  }

  @Public()
  @Get('slug/:slug')
  async getProjectBySlug(@Param('slug') slug: string) {
    return this.projectsService.getProjectBySlug(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProject(@Body() dto: CreateProjectDto) {
    return this.projectsService.createProject(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateProject(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectsService.updateProject(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteProject(@Param('id') id: string) {
    return this.projectsService.deleteProject(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/projects',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `project-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return {
      url: `/uploads/projects/${file.filename}`,
      filename: file.filename,
    };
  }
}

