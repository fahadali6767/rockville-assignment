import { Model } from 'mongoose';
import { User } from 'src/database/user/user.modal';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    createUser(postData: any): Promise<User>;
    updateUserById(id: string, postData: any): Promise<User | null>;
    getUserByEmail(email: string, includePassword?: boolean): Promise<User | null>;
    getUserByID(id: string, includePassword?: boolean): Promise<User | null>;
    addFavoriteCategory(userId: string, categoryId: string): Promise<User | null>;
    removeFavoriteCategory(userId: string, categoryId: string): Promise<User | null>;
}
