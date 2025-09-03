import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { AuthGuard } from 'src/common/auth-guard/auth-guard.guard';


@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getMovies(@Query() query: any) {
    // Pass query params to service for filtering
    return await this.moviesService.getMovies(query);
  }
}
