import { Model } from 'mongoose';
export declare class CategoriesService {
    private readonly categoryModel;
    constructor(categoryModel: Model<any>);
    getAllCategories(): Promise<any[]>;
    deleteCategories(ids: any): Promise<import("mongodb").DeleteResult>;
    updateCategory(id: string, body: any): Promise<any>;
}
