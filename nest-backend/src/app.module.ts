import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { MoviesModule } from './movies/movies.module';
import { RatingsModule } from './ratings/ratings.module';
import {
  getConnectionToken,
  InjectModel,
  MongooseModule,
} from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { categorySchema } from './database/category/category.modal';
import { categortData } from './database/category/category.seed';
import { movieSchema } from './database/movie/movie.modal';
import { movieData } from './database/movie/movie.seed';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    // Load environment variables first
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // Configure MongooseModule using ConfigService
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbName = configService.get<string>('MONGO_DB');
        const host = configService.get<string>('MONGO_DB_HOST');
        const port = configService.get<string>('MONGO_DB_PORT');
        const poolSize = configService.get<string>('MONGO_POOL_SIZE');
        
        // Construct the MongoDB URI dynamically
        const uri = `mongodb://${host}:${port}/${dbName}?maxPoolSize=${poolSize}`;
        
        console.log(`Connecting to MongoDB: ${uri}`);
        
        return {
          uri,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
      inject: [ConfigService],
    }),
    
    UsersModule,
    AuthModule,
    CategoriesModule,
    MoviesModule,
    RatingsModule,
    MongooseModule.forFeature([{ name: 'Category', schema: categorySchema }]),
    MongooseModule.forFeature([{ name: 'Movie', schema: movieSchema }]),
    MediaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    @Inject(getConnectionToken()) private connection: Connection,
    @InjectModel('Category') private readonly categoryModel: Model<any>,
    @InjectModel('Movie') private readonly movieModal: Model<any>,
    private readonly configService: ConfigService,
  ) {}

  async seedCategories() {
    return await this.categoryModel.insertMany(categortData);
  }
  
  async seedMovies(insertedCategories) {
    insertedCategories.forEach((category, index) => {
      movieData[index].category = category._id;
    });
    return await this.movieModal.insertMany(movieData);
  }

  async onModuleInit() {
    try {
      // Check connection state
      const state = this.connection.readyState;
      console.log(`MongoDB connection state: ${state}`);
      
      // Log database info from environment variables
      const dbName = this.configService.get('MONGO_DB');
      const host = this.configService.get('MONGO_DB_HOST');
      const port = this.configService.get('MONGO_DB_PORT');
      console.log(`Using MongoDB: ${host}:${port}/${dbName}`);

      if (state === 1) {
        const count = await this.categoryModel.countDocuments();
        if (count === 0) {
          const insertedCategories = await this.seedCategories();
          await this.seedMovies(insertedCategories);
          console.log('categories and movies data seeded');
        }
        console.log('✅ MongoDB is connected');
      } else {
        console.log('❌ MongoDB is not connected');
      }
    } catch (error) {
      console.error('Error checking MongoDB connection:', error);
    }
  }
}