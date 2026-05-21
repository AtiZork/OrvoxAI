import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { getUploadRoot, uploadSubdir } from './common/config/paths';
import { existsSync } from 'fs';
import * as path from 'path';
import * as express from 'express';
import type { Request, Response, NextFunction } from 'express';

function parseAllowedOrigins(): string[] {
  const fromEnv = (process.env.FRONTEND_URL || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (fromEnv.length > 0) return fromEnv;
  if (process.env.NODE_ENV !== 'production') {
    return ['http://localhost:3000', 'http://127.0.0.1:3000'];
  }
  return [];
}

function setupStaticFrontend(app: INestApplication, staticRoot: string) {
  const root = path.resolve(staticRoot);
  if (!existsSync(root)) {
    console.warn(`⚠️ STATIC_ROOT not found: ${root} — run npm run build:cpanel from repo root`);
    return;
  }

  const http = app.getHttpAdapter().getInstance();

  http.use(express.static(root, { extensions: ['html'], fallthrough: true }));

  http.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    const url = req.path;

    if (
      url.startsWith('/api') ||
      url.startsWith('/auth') ||
      url.startsWith('/uploads')
    ) {
      return next();
    }

    if (/^\/portfolio\/[^/]+\/?$/.test(url)) {
      const memberPage = path.join(root, 'portfolio', 'default', 'index.html');
      if (existsSync(memberPage)) {
        return res.sendFile(memberPage);
      }
    }

    const candidates = [
      path.join(root, url, 'index.html'),
      path.join(root, url.replace(/\/$/, '') + '.html'),
      path.join(root, 'index.html'),
    ];

    for (const file of candidates) {
      if (existsSync(file)) {
        return res.sendFile(file);
      }
    }

    next();
  });

  console.log(`🌐 Static site: ${root}`);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = parseAllowedOrigins();
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  uploadSubdir('team');
  uploadSubdir('projects');
  uploadSubdir('testimonials');
  app.use('/uploads', express.static(getUploadRoot()));

  if (process.env.STATIC_ROOT) {
    setupStaticFrontend(app, process.env.STATIC_ROOT);
  }

  const port = parseInt(process.env.PORT || '3001', 10);
  const host = process.env.HOST || '0.0.0.0';
  await app.listen(port, host);
  console.log(`🚀 Backend running on ${host}:${port}`);
  console.log(`📁 Uploads: ${getUploadRoot()}`);
}

bootstrap();
