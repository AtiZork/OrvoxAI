import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [
      teamGroupsCount,
      teamMembersCount,
      projectsCount,
      servicesCount,
      pricingPlansCount,
      statsCount,
      testimonialsCount,
    ] = await Promise.all([
      this.prisma.teamGroup.count(),
      this.prisma.teamMember.count(),
      this.prisma.project.count(),
      this.prisma.service.count(),
      this.prisma.pricingPlan.count(),
      this.prisma.stat.count(),
      this.prisma.testimonial.count(),
    ]);

    return {
      teamGroups: teamGroupsCount,
      teamMembers: teamMembersCount,
      projects: projectsCount,
      services: servicesCount,
      pricingPlans: pricingPlansCount,
      stats: statsCount,
      testimonials: testimonialsCount,
    };
  }
}







