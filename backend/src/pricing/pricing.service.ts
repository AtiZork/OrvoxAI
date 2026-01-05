import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePricingPlanDto, UpdatePricingPlanDto } from './dto/pricing-plan.dto';

@Injectable()
export class PricingService {
  constructor(private prisma: PrismaService) {}

  private parsePricingPlan(plan: any) {
    return {
      ...plan,
      features: this.safeParseJSON(plan.features, []),
    };
  }

  private safeParseJSON(jsonString: string | null | undefined, fallback: any = []): any {
    if (jsonString === null || jsonString === undefined) return fallback;
    if (typeof jsonString !== 'string') {
      // If it's already an array/object, return it
      if (Array.isArray(jsonString) || (typeof jsonString === 'object' && jsonString !== null)) {
        return jsonString;
      }
      return fallback;
    }
    if (jsonString.trim() === '') return fallback;
    try {
      const parsed = JSON.parse(jsonString);
      return parsed;
    } catch (error) {
      console.error('JSON parse error:', { jsonString, error });
      return fallback;
    }
  }

  async getAllPlans() {
    const plans = await this.prisma.pricingPlan.findMany({
      orderBy: { order: 'asc' },
    });
    return plans.map(p => this.parsePricingPlan(p));
  }

  async getPlanById(id: string) {
    const plan = await this.prisma.pricingPlan.findUnique({
      where: { id },
    });

    if (!plan) {
      throw new NotFoundException('Pricing plan not found');
    }

    return this.parsePricingPlan(plan);
  }

  async createPlan(dto: CreatePricingPlanDto) {
    const plan = await this.prisma.pricingPlan.create({
      data: dto,
    });
    return this.parsePricingPlan(plan);
  }

  async updatePlan(id: string, dto: UpdatePricingPlanDto) {
    const plan = await this.prisma.pricingPlan.update({
      where: { id },
      data: dto,
    });
    return this.parsePricingPlan(plan);
  }

  async deletePlan(id: string) {
    return this.prisma.pricingPlan.delete({
      where: { id },
    });
  }
}






