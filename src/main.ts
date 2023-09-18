// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as multer from 'multer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(multer({ dest: './uploads/' }).array('files'));
  await app.listen(3000);
}
bootstrap();
