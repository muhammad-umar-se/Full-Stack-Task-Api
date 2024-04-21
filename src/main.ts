import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { CorsMiddleware } from './middlewares/cors';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;
  const logger = new Logger('Bootstrap');
  app.use(new CorsMiddleware(logger).use.bind(new CorsMiddleware(logger)));
  await app.listen(port);
  logger.log(`App is running on port ${port}...`);
}
bootstrap();
