import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url:
            process.env.ENVIRONMENT === 'development'
              ? process.env.DEV_DATABASE_URL
              : process.env.DATABASE_URL,
        },
      },
    });
  }
}
