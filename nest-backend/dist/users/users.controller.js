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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_guard_1 = require("../common/auth-guard/auth-guard.guard");
const users_service_1 = require("./users.service");
const validation_pipe_1 = require("../common/pipes/validation-pipe");
const user_dto_1 = require("./user.dto");
let UsersController = class UsersController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async updateProfile(body, req) {
        let user = req.user;
        const bodyData = {
            dateOfBirth: body?.dateOfBirth,
            address: body?.address,
            name: body?.name,
        };
        if (body?.profileImage) {
            bodyData.profileImage = body.profileImage;
        }
        let updatedData = await this.userService.updateUserById(user._id, bodyData);
        return { updatedData, message: 'User updated successfully.' };
    }
    async getUserById(id) {
        return await this.userService.getUserByID(id);
    }
    async addFavoriteCategory(body, req) {
        let user = req.user;
        let categoriesId = body.categoriesId;
        return await this.userService.addFavoriteCategory(user?._id, categoriesId);
    }
    async removeFavoriteCategory(body, req) {
        let user = req.user;
        let categoryId = body.categoryId;
        return await this.userService.removeFavoriteCategory(user?._id, categoryId);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UseGuards)(auth_guard_guard_1.AuthGuard),
    (0, common_1.UsePipes)(new validation_pipe_1.JoiValidationPipe(user_dto_1.updateProfileSchema)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdateProfileDto, Request]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.UseGuards)(auth_guard_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Put)('category/add'),
    (0, common_1.UseGuards)(auth_guard_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Request]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addFavoriteCategory", null);
__decorate([
    (0, common_1.Put)('category/remove'),
    (0, common_1.UseGuards)(auth_guard_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Request]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "removeFavoriteCategory", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map