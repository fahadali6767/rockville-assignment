import * as mongoose from 'mongoose';

export const ratingsSchema = new mongoose.Schema(
  {

    rating: {
      type: Number,
    },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'movies' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  },
  { timestamps: true },
);