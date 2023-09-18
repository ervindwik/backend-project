// raw-data.schema.ts

import * as mongoose from 'mongoose';

export const RawDataSchema = new mongoose.Schema({
  resultTime: { type: Date, required: true },
  enodebId: { type: String, required: true },
  cellId: { type: String, required: true },
  availDur: { type: Number, required: true },
  uniqueKey: { type: String, required: true, unique: true },
});
