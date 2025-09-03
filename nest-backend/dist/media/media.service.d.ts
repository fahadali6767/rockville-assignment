export declare class MediaService {
    private readonly uploadPath;
    uploadFile(file: Express.Multer.File): Promise<{
        filename: string;
        originalName: string;
        size: number;
        mimetype: string;
    }>;
    uploadMultipleFiles(files: Express.Multer.File[]): Promise<any[]>;
    getFile(filename: string): Promise<string>;
    deleteFile(filename: string): Promise<void>;
    listFiles(): Promise<string[]>;
}
