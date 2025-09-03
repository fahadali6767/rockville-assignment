import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/database/user/user.modal';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}


  async createUser(postData: any): Promise<User> {
    const newUser = new this.userModel(postData);
    return await newUser.save();
  }

  async updateUserById(id: string, postData: any): Promise<User | null> {
    return await this.userModel.findByIdAndUpdate(id, postData, { new: true }).select('-password');
  }


  async getUserByEmail(
    email: string,
    includePassword = false,
  ): Promise<User | null> {
    const query = this.userModel.findOne({ email });

    if (!includePassword) {
      query.select('-password'); // Exclude the password field
    }

    return await query.exec();
  }


  async getUserByID(id:string, includePassword = false): Promise<User | null> {
    const projection = includePassword ? {} : { password: 0 };
    return await this.userModel.findOne({ _id: id }, projection).lean();
};
  async addFavoriteCategory(userId: string, categoryId: string): Promise<User | null> {
    console.log(userId,categoryId)
    return await this.userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { favoriteCategories: categoryId } },
      { new: true }
    ).select('-password');
  }
  async removeFavoriteCategory(userId: string, categoryId: string): Promise<User | null> {
    console.log(userId,categoryId)
    return await this.userModel.findByIdAndUpdate(
      userId,
      { $pull: { favoriteCategories: categoryId } },
      { new: true }
    ).select('-password');
  }

}
