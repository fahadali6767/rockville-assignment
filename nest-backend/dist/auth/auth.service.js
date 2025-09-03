"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    usersService;
    jwtService;
    configService;
    constructor(usersService, jwtService, configService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    generateToken(user) {
        const payload = { userId: user._id, email: user.email, role: user.role };
        return this.jwtService.sign(payload);
    }
    async verifyToken(token) {
        try {
            const secret = this.configService.get('JWT_SECRET');
            const payload = await this.jwtService.verifyAsync(token, {
                secret,
            });
            return payload;
        }
        catch (error) {
            console.log(error);
        }
    }
    async signup({ email, role, address, name, dateOfBirth, profileImage, password, }) {
        let user = await this.usersService.getUserByEmail(email, true);
        if (user)
            throw new common_1.UnauthorizedException('User already exists');
        if (!user) {
            user = await this.usersService.createUser({
                email,
                role,
                address,
                name,
                dateOfBirth,
                profileImage,
                password,
            });
        }
        const token = this.generateToken(user);
        const userWithoutPassword = await this.usersService.getUserByID(user._id);
        return {
            user: userWithoutPassword,
            token,
            message: 'User successfully registered',
        };
    }
    async loginWithEmail(email, password) {
        const user = await this.usersService.getUserByEmail(email, true);
        if (!user)
            throw new common_1.NotFoundException('User account not found');
        if (!(await user.matchPassword(password)))
            throw new common_1.UnauthorizedException('Incorrect email or password');
        const token = this.generateToken(user);
        const userWithoutPassword = await this.usersService.getUserByID(user._id);
        return {
            user: userWithoutPassword,
            token,
            message: 'User loggedin successfully',
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map