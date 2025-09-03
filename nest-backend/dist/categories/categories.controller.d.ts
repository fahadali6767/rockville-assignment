import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getCategories(): Promise<any[]>;
    updateCategory(id: string, body: any): Promise<any>;
    deleteCategories(body: any): Promise<import("mongodb").DeleteResult>;
}
