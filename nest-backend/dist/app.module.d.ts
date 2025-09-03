import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Connection, Model } from 'mongoose';
export declare class AppModule implements OnModuleInit {
    private connection;
    private readonly categoryModel;
    private readonly movieModal;
    private readonly configService;
    constructor(connection: Connection, categoryModel: Model<any>, movieModal: Model<any>, configService: ConfigService);
    seedCategories(): Promise<any[]>;
    seedMovies(insertedCategories: any): Promise<any[]>;
    onModuleInit(): Promise<void>;
}
