import * as Joi from 'joi';
export declare class UpdateProfileDto {
    dateOfBirth?: Date;
    address?: string;
    name?: string;
    profileImage?: string;
}
export declare const updateProfileSchema: Joi.ObjectSchema<any>;
