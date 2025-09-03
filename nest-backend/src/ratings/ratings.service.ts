import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RatingsService {
  constructor(@InjectModel('Rating') private readonly ratingModel: Model<any>) {}

 async addRating(data) {
    return await this.ratingModel.create(data);
  }
  async getAverageRatings(){
    // Aggregate average rating for each movie
    const result = await this.ratingModel.aggregate([
      {
        $group: {
          _id: '$movieId',
          averageRating: { $avg: '$rating' },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          movieId: '$_id',
          averageRating: { $round: ['$averageRating', 2] },
          ratingCount: '$count'
        }
      }
    ]);
    return result;
  }
}
