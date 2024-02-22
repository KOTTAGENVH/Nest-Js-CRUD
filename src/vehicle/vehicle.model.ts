import * as mongoose from 'mongoose';

export const VehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  plate: { type: String, required: true, unique:false },
});

export interface Vehicle extends mongoose.Document {
  id: string;
  name: string;
  description: string;
  plate: string;
}