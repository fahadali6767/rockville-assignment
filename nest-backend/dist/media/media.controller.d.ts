import { MediaService } from './media.service';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    uploadFile(file: Express.Multer.File): Promise<{
        filename: string;
        originalName: string;
        size: number;
        mimetype: string;
    }>;
    deleteFile(filename: string): Promise<{
        message: string;
    }>;
}
