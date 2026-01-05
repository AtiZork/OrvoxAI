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
import { StatsService } from './stats.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { CreateStatDto, UpdateStatDto } from './dto/stat.dto';

@Controller('api/stats')
export class StatsController {
  constructor(private statsService: StatsService) {}

  @Public()
  @Get()
  async getAllStats() {
    return this.statsService.getAllStats();
  }

  @Public()
  @Get(':id')
  async getStatById(@Param('id') id: string) {
    return this.statsService.getStatById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createStat(@Body() dto: CreateStatDto) {
    return this.statsService.createStat(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateStat(@Param('id') id: string, @Body() dto: UpdateStatDto) {
    return this.statsService.updateStat(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteStat(@Param('id') id: string) {
    return this.statsService.deleteStat(id);
  }
}







