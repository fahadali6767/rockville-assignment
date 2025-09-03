import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
    constructor(@InjectModel('Category') private readonly categoryModel: Model<any>){}

    async getAllCategories(){
        return await this.categoryModel.find({})
    }
    async deleteCategories(ids){
        return await this.categoryModel.deleteMany({_id:{$in:ids}})
    }

    async updateCategory(id: string, body: any) {
        return await this.categoryModel.findByIdAndUpdate(id, body, { new: true });
    }
}
