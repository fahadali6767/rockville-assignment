import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MoviesService {

    constructor(@InjectModel('Movie') private readonly movieModal: Model<any>){}

    async getMovies(query) {
        if (query?.movieName) {
            query = {
                ...query,
                movieName: { $regex: query.movieName, $options: 'i' }
            };
        }

        // Use aggregation to join with ratings and calculate averageRating
        const movies = await this.movieModal.aggregate([
            { $match: query },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category', // assuming 'category' field contains ObjectId
                    foreignField: '_id',
                    as: 'categoryData'
                }
            },
            {
                $lookup: {
                    from: 'ratings',
                    localField: '_id',
                    foreignField: 'movieId',
                    as: 'ratings'
                }
            },
            {
                $addFields: {
                    averageRating: {
                        $cond: [
                            { $gt: [{ $size: '$ratings' }, 0] },
                            { $round: [{ $avg: '$ratings.rating' }, 2] },
                            0
                        ]
                    }
                }
            },
            {
                $project: {
                    ratings: 0 // Exclude ratings array from result
                }
            }
        ]);
        return movies;
    }
}
