import { Model } from 'mongoose';
export declare class RatingsService {
    private readonly ratingModel;
    constructor(ratingModel: Model<any>);
    addRating(data: any): Promise<any>;
    getAverageRatings(): Promise<any[]>;
}
