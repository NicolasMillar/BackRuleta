import { Schema, model, Document } from 'mongoose';
import { IParticipant } from '../../../domain/entities/participant.interface.js';

export interface IParticipantDocument extends Omit<IParticipant, 'id' | '_id'>, Document { }

export const ParticipantSchema = new Schema<IParticipantDocument>(
  {
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true
    },
    wins: {
      type: Number,
      default: 0,
      min: [0, 'Las victorias no pueden ser negativas']
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const ParticipantModel = model<IParticipantDocument>('Participant', ParticipantSchema);