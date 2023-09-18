// app.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createReadStream } from 'fs';
import * as csvParser from 'csv-parser';
import { RawData } from './interafaces/raw-data.interface';

@Injectable()
export class AppService {
  constructor(@InjectModel('RawData') private readonly rawDataModel: Model<RawData>) {}

  async processCsv(file: Express.Multer.File): Promise<string> {
    const data: RawData[] = [];

    return new Promise((resolve, reject) => {
      const stream = createReadStream(file.path)
        .pipe(csvParser())
        .on('data', (row) => {
          const resultTime = new Date(row['Result Time']);
          const objectName = row['Object Name'];
          const enodebIdMatch = objectName.match(/eNodeB ID=(\d+)/);
          const cellIdMatch = objectName.match(/Local Cell ID=(\d+)/);
          const availDur = parseInt(row['L.Cell.Avail.Dur']);

          if (enodebIdMatch && cellIdMatch) {
            const enodebId = enodebIdMatch[1];
            const cellId = cellIdMatch[1];
            const uniqueKey = `${resultTime}-${enodebId}-${cellId}`;

            const rawData: RawData = {
              resultTime,
              enodebId,
              cellId,
              availDur,
              uniqueKey,
            };
            
            data.push(rawData);
          }
        })
        .on('end', async () => {
          try {
            const result = await this.rawDataModel.insertMany(data, { ordered: false });
            resolve('Data successfully inserted to MongoDB.');
          } catch (error) {
            reject('Error inserting data to MongoDB.');
          }
        });
    });
  }
}
