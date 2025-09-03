import * as mongoose from 'mongoose';
export declare const movieSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    movieName: string;
    description?: string | null | undefined;
    category?: mongoose.Types.ObjectId | null | undefined;
    imageUrl?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    movieName: string;
    description?: string | null | undefined;
    category?: mongoose.Types.ObjectId | null | undefined;
    imageUrl?: string | null | undefined;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    movieName: string;
    description?: string | null | undefined;
    category?: mongoose.Types.ObjectId | null | undefined;
    imageUrl?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
