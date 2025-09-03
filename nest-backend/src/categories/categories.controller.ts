import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Get()
  getCategories(){
    let categories= this.categoriesService.getAllCategories()
    return categories
  }


  @Put('/update/:id')
  async updateCategory(@Param('id') id: string, @Body() body: any) {
    return await this.categoriesService.updateCategory(id, body);
  }



  @Delete()
  deleteCategories(@Body() body){
    let deleteIds= body.ids
    let categories= this.categoriesService.deleteCategories(deleteIds)
    return categories
  }
}
