import { Controller, Post, Get, Delete, Param, UseInterceptors, UploadedFile, UploadedFiles, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { AuthGuard } from 'src/common/auth-guard/auth-guard.guard';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.mediaService.uploadFile(file);
  }

  


  @Delete('file/:filename')
  @UseGuards(AuthGuard)
  async deleteFile(@Param('filename') filename: string) {
    await this.mediaService.deleteFile(filename);
    return { message: 'File deleted successfully' };
  }
}