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
import { PricingService } from './pricing.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { CreatePricingPlanDto, UpdatePricingPlanDto } from './dto/pricing-plan.dto';

@Controller('api/pricing')
export class PricingController {
  constructor(private pricingService: PricingService) {}

  @Public()
  @Get()
  async getAllPlans() {
    return this.pricingService.getAllPlans();
  }

  @Public()
  @Get(':id')
  async getPlanById(@Param('id') id: string) {
    return this.pricingService.getPlanById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPlan(@Body() dto: CreatePricingPlanDto) {
    return this.pricingService.createPlan(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updatePlan(@Param('id') id: string, @Body() dto: UpdatePricingPlanDto) {
    return this.pricingService.updatePlan(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePlan(@Param('id') id: string) {
    return this.pricingService.deletePlan(id);
  }
}








