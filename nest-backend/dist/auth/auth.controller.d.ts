import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signupUser(bodyData: any): Promise<{
        user: import("../database/user/user.modal").User | null;
        token: string;
        message: string;
    }>;
    login(bodyData: any): Promise<{
        user: import("../database/user/user.modal").User | null;
        token: string;
        message: string;
    }>;
}
