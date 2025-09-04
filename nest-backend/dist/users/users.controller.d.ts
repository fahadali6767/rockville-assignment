import { UsersService } from './users.service';
import { UpdateProfileDto } from './user.dto';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    updateProfile(body: UpdateProfileDto, req: Request): Promise<{
        updatedData: import("../database/user/user.modal").User | null;
        message: string;
    }>;
    getUserById(id: string): Promise<import("../database/user/user.modal").User | null>;
    addFavoriteCategory(body: any, req: Request): Promise<import("../database/user/user.modal").User | null>;
    removeFavoriteCategory(body: any, req: Request): Promise<import("../database/user/user.modal").User | null>;
}
