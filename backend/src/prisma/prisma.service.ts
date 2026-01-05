import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import * as Database from 'better-sqlite3';
import { join } from 'path';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const dbPath = process.env.DATABASE_URL?.replace('file:', '') || '../dev.db';
    const fullPath = join(__dirname, '../../', dbPath);
    const adapter = new PrismaLibSql({ url: `file:${fullPath}` });
    
    super({
      adapter,
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}






