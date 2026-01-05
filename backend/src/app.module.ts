import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { TeamsModule } from './teams/teams.module';
import { ProjectsModule } from './projects/projects.module';
import { ServicesModule } from './services/services.module';
import { PricingModule } from './pricing/pricing.module';
import { StatsModule } from './stats/stats.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { AboutModule } from './about/about.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    AdminModule,
    TeamsModule,
    ProjectsModule,
    ServicesModule,
    PricingModule,
    StatsModule,
    TestimonialsModule,
    AboutModule,
    ContactModule,
  ],
})
export class AppModule {}
