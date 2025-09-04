import * as Joi from 'joi';  // Correct import

export class UpdateProfileDto {
  dateOfBirth?: Date;
  address?: string;
  name?: string;
  profileImage?: string;
}

export const updateProfileSchema = Joi.object({
  dateOfBirth: Joi.string().optional(),
  address: Joi.string().optional().max(255),
  name: Joi.string().optional().max(100),
  profileImage: Joi.string().optional().uri().max(500),
}).min(1);