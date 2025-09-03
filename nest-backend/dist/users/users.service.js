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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UsersService = class UsersService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(postData) {
        const newUser = new this.userModel(postData);
        return await newUser.save();
    }
    async updateUserById(id, postData) {
        return await this.userModel.findByIdAndUpdate(id, postData, { new: true }).select('-password');
    }
    async getUserByEmail(email, includePassword = false) {
        const query = this.userModel.findOne({ email });
        if (!includePassword) {
            query.select('-password');
        }
        return await query.exec();
    }
    async getUserByID(id, includePassword = false) {
        const projection = includePassword ? {} : { password: 0 };
        return await this.userModel.findOne({ _id: id }, projection).lean();
    }
    ;
    async addFavoriteCategory(userId, categoryId) {
        console.log(userId, categoryId);
        return await this.userModel.findByIdAndUpdate(userId, { $addToSet: { favoriteCategories: categoryId } }, { new: true }).select('-password');
    }
    async removeFavoriteCategory(userId, categoryId) {
        console.log(userId, categoryId);
        return await this.userModel.findByIdAndUpdate(userId, { $pull: { favoriteCategories: categoryId } }, { new: true }).select('-password');
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map