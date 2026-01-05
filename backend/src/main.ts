import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import * as path from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend - allow all origins in development
  const isDevelopment = process.env.NODE_ENV !== 'production';
  app.enableCors({
    origin: isDevelopment ? true : (process.env.FRONTEND_URL || 'http://localhost:3000'),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false, // Changed to false to prevent validation errors
    }),
  );

  // Serve static files for uploads
  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Backend server running on http://localhost:${port}`);
  console.log(`📁 Admin panel: http://localhost:${port}/admin`);
}

bootstrap();






