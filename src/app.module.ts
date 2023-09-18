// app.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RawDataSchema } from './raw-data.schema';
import { RawData } from './interafaces/raw-data.interface';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6'),
    MongooseModule.forFeature([{ name: 'RawData' , schema: RawDataSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



// mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6