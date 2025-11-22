import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  company: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description?: string;
  achievements?: string[];
  skills?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const experienceSchema = new Schema<IExperience>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'UserProfile',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    current: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      trim: true,
    },
    achievements: [
      {
        type: String,
        trim: true,
      },
    ],
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
    collection: 'experiences',
  },
);

// Índice compuesto para búsquedas eficientes
experienceSchema.index({ userId: 1, startDate: -1 });

export const Experience = mongoose.model<IExperience>('Experience', experienceSchema);