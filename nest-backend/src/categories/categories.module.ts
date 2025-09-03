import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { categorySchema } from 'src/database/category/category.modal';

@Module({
  imports:[ MongooseModule.forFeature([{ name: 'Category', schema: categorySchema }])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
