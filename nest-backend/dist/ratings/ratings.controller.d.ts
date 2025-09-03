import { RatingsService } from './ratings.service';
export declare class RatingsController {
    private readonly ratingsService;
    constructor(ratingsService: RatingsService);
    addRating(body: any): Promise<any>;
    getAverageRatings(): Promise<any[]>;
}
