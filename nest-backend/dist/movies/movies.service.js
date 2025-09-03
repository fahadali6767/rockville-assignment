"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let MoviesService = class MoviesService {
    movieModal;
    constructor(movieModal) {
        this.movieModal = movieModal;
    }
    async getMovies(query) {
        if (query?.movieName) {
            query = {
                ...query,
                movieName: { $regex: query.movieName, $options: 'i' }
            };
        }
        const movies = await this.movieModal.aggregate([
            { $match: query },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
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
                    ratings: 0
                }
            }
        ]);
        return movies;
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Movie')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MoviesService);
//# sourceMappingURL=movies.service.js.map