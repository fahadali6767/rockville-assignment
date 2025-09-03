import { Model } from 'mongoose';
export declare class MoviesService {
    private readonly movieModal;
    constructor(movieModal: Model<any>);
    getMovies(query: any): Promise<any[]>;
}
