import * as mongoose from 'mongoose';
export declare const ratingsSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user?: mongoose.Types.ObjectId | null | undefined;
    movieId?: mongoose.Types.ObjectId | null | undefined;
    rating?: number | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user?: mongoose.Types.ObjectId | null | undefined;
    movieId?: mongoose.Types.ObjectId | null | undefined;
    rating?: number | null | undefined;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user?: mongoose.Types.ObjectId | null | undefined;
    movieId?: mongoose.Types.ObjectId | null | undefined;
    rating?: number | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
