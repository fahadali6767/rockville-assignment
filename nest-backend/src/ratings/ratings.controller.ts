import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { RatingsService } from './ratings.service';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
 async addRating(@Body() body) {
    if (!body.rating && !body.user && !body.movieId) {
      throw new BadRequestException(
        'Missing required fields: rating, user, or movieId',
      );
    }
   return await this.ratingsService.addRating(body);
  }

  @Get('average')
 async getAverageRatings(){
    return await this.ratingsService.getAverageRatings()
  }
}
