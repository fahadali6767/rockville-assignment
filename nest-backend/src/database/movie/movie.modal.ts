import * as mongoose from 'mongoose';

export const movieSchema = new mongoose.Schema(
  {
    movieName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      
    },
    imageUrl: {
      type: String,
      
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
  },
  { timestamps: true },
);