import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ratingsSchema } from 'src/database/ratings/ratings.modal';

@Module({
  imports:[MongooseModule.forFeature([{name:"Rating",schema:ratingsSchema}])],
  controllers: [RatingsController],
  providers: [RatingsService],
})
export class RatingsModule {}
