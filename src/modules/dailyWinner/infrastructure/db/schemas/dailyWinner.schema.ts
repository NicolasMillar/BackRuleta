import { Schema, model, Document } from 'mongoose';
import { IDailyWinner } from '../../../domain/entities/dailyWinner.interface.js';

export interface IDailyWinnerDocument extends Omit<IDailyWinner, 'id' | '_id'>, Document { }

export const DailyWinnerSchema = new Schema<IDailyWinnerDocument>(
  {
    name: {
      type: String,
      required: [true, 'El nombre del ganador es obligatorio'],
      trim: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const DailyWinnerModel = model<IDailyWinnerDocument>('DailyWinner', DailyWinnerSchema);