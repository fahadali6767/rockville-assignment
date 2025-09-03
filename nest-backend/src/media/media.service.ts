import { Injectable, BadRequestException } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class MediaService {
  private readonly uploadPath = './uploads';

  async uploadFile(file: Express.Multer.File): Promise<{ filename: string; originalName: string; size: number; mimetype: string }> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    return {
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    };
  }

  async uploadMultipleFiles(files: Express.Multer.File[]): Promise<any[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }

    return files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    }));
  }

  async getFile(filename: string): Promise<string> {
    const filePath = join(this.uploadPath, filename);
    
    try {
      await fs.access(filePath);
      return filePath;
    } catch (error) {
      throw new BadRequestException('File not found');
    }
  }

  async deleteFile(filename: string): Promise<void> {
    const filePath = join(this.uploadPath, filename);
    
    try {
      await fs.unlink(filePath);
    } catch (error) {
      throw new BadRequestException('File not found or could not be deleted');
    }
  }

  async listFiles(): Promise<string[]> {
    try {
      return await fs.readdir(this.uploadPath);
    } catch (error) {
      await fs.mkdir(this.uploadPath, { recursive: true });
      return [];
    }
  }
}