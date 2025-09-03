import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { movieSchema } from 'src/database/movie/movie.modal';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'Movie', schema: movieSchema }]),
    AuthModule,
    UsersModule
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
