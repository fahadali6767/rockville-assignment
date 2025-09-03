import * as mongoose from 'mongoose';
export declare const userSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    role: "ADMIN" | "USER";
    favoriteCategories: mongoose.Types.ObjectId[];
    name?: string | null | undefined;
    address?: any;
    dateOfBirth?: string | null | undefined;
    profileImage?: string | null | undefined;
    password?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    role: "ADMIN" | "USER";
    favoriteCategories: mongoose.Types.ObjectId[];
    name?: string | null | undefined;
    address?: any;
    dateOfBirth?: string | null | undefined;
    profileImage?: string | null | undefined;
    password?: string | null | undefined;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    role: "ADMIN" | "USER";
    favoriteCategories: mongoose.Types.ObjectId[];
    name?: string | null | undefined;
    address?: any;
    dateOfBirth?: string | null | undefined;
    profileImage?: string | null | undefined;
    password?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export interface User {
    matchPassword(password: any): unknown;
    _id: string;
    email: string;
    address?: any;
    name?: string;
    dateOfBirth?: string;
    profileImage?: string;
    role: 'ADMIN' | 'USER';
    password?: string;
}
