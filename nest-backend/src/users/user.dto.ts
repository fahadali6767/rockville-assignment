import * as Joi from 'joi'; // Correct import

export class UpdateProfileDto {
  dateOfBirth?: Date;
  address?: string;
  name?: string;
  profileImage?: string;
}

export const updateProfileSchema = Joi.object({
  dateOfBirth: Joi.string().optional().allow(''),
  address: Joi.string().optional().max(255).allow(''),
  name: Joi.string().optional().max(100).allow(''),
  profileImage: Joi.string().optional().uri().max(500).allow(''),
}).min(1);
