// raw-data.interface.ts

import { Document } from 'mongoose';

export interface RawData extends Document {
  resultTime: Date;
  enodebId: string;
  cellId: string;
  availDur: number;
  uniqueKey: string;
}
