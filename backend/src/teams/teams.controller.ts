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
import { TeamsService } from './teams.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { CreateTeamGroupDto, UpdateTeamGroupDto } from './dto/team-group.dto';
import { CreateTeamMemberDto, UpdateTeamMemberDto } from './dto/team-member.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('api/teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @Public()
  @Get('groups')
  async getAllGroups() {
    return this.teamsService.getAllGroups();
  }

  @Public()
  @Get('groups/:id')
  async getGroupById(@Param('id') id: string) {
    return this.teamsService.getGroupById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('groups')
  async createGroup(@Body() dto: CreateTeamGroupDto) {
    return this.teamsService.createGroup(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('groups/:id')
  async updateGroup(@Param('id') id: string, @Body() dto: UpdateTeamGroupDto) {
    return this.teamsService.updateGroup(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('groups/:id')
  async deleteGroup(@Param('id') id: string) {
    return this.teamsService.deleteGroup(id);
  }

  @Public()
  @Get('members')
  async getAllMembers() {
    return this.teamsService.getAllMembers();
  }

  @Public()
  @Get('members/slug/:slug')
  async getMemberBySlug(@Param('slug') slug: string) {
    return this.teamsService.getMemberBySlug(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Post('members')
  async createMember(@Body() dto: CreateTeamMemberDto) {
    return this.teamsService.createMember(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('members/:id')
  async updateMember(@Param('id') id: string, @Body() dto: UpdateTeamMemberDto) {
    return this.teamsService.updateMember(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('members/:id')
  async deleteMember(@Param('id') id: string) {
    return this.teamsService.deleteMember(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
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
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return {
      url: `/uploads/team/${file.filename}`,
      filename: file.filename,
    };
  }
}
