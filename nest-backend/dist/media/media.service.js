"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
let MediaService = class MediaService {
    uploadPath = './uploads';
    async uploadFile(file) {
        if (!file) {
            throw new common_1.BadRequestException('No file provided');
        }
        return {
            filename: file.filename,
            originalName: file.originalname,
            size: file.size,
            mimetype: file.mimetype,
        };
    }
    async uploadMultipleFiles(files) {
        if (!files || files.length === 0) {
            throw new common_1.BadRequestException('No files provided');
        }
        return files.map(file => ({
            filename: file.filename,
            originalName: file.originalname,
            size: file.size,
            mimetype: file.mimetype,
        }));
    }
    async getFile(filename) {
        const filePath = (0, path_1.join)(this.uploadPath, filename);
        try {
            await fs_1.promises.access(filePath);
            return filePath;
        }
        catch (error) {
            throw new common_1.BadRequestException('File not found');
        }
    }
    async deleteFile(filename) {
        const filePath = (0, path_1.join)(this.uploadPath, filename);
        try {
            await fs_1.promises.unlink(filePath);
        }
        catch (error) {
            throw new common_1.BadRequestException('File not found or could not be deleted');
        }
    }
    async listFiles() {
        try {
            return await fs_1.promises.readdir(this.uploadPath);
        }
        catch (error) {
            await fs_1.promises.mkdir(this.uploadPath, { recursive: true });
            return [];
        }
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)()
], MediaService);
//# sourceMappingURL=media.service.js.map