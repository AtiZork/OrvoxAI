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
import { ServicesService } from './services.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';

@Controller('api/services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Public()
  @Get()
  async getAllServices() {
    return this.servicesService.getAllServices();
  }

  @Public()
  @Get(':id')
  async getServiceById(@Param('id') id: string) {
    return this.servicesService.getServiceById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createService(@Body() dto: CreateServiceDto) {
    return this.servicesService.createService(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateService(@Param('id') id: string, @Body() dto: UpdateServiceDto) {
    return this.servicesService.updateService(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteService(@Param('id') id: string) {
    return this.servicesService.deleteService(id);
  }
}








