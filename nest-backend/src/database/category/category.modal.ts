import * as mongoose from 'mongoose';

export const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      enum: ['Action', 'Horror', 'Comedy', 'Animated'],
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);