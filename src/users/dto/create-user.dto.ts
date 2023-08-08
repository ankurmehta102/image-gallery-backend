import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { RolesEnum } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  // @IsNotEmpty()
  // @IsEnum(RolesEnum)
  // role: RolesEnum;
}
