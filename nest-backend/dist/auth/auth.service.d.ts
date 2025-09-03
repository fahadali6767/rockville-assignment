import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private usersService;
    private jwtService;
    private configService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    private generateToken;
    verifyToken(token: any): Promise<any>;
    signup({ email, role, address, name, dateOfBirth, profileImage, password, }: {
        email: any;
        role: any;
        address: any;
        name: any;
        dateOfBirth: any;
        profileImage: any;
        password: any;
    }): Promise<{
        user: import("../database/user/user.modal").User | null;
        token: string;
        message: string;
    }>;
    loginWithEmail(email: any, password: any): Promise<{
        user: import("../database/user/user.modal").User | null;
        token: string;
        message: string;
    }>;
}
