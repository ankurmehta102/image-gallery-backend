import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RolesEnum } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  // @IsNotEmpty()
  // @IsEnum(RolesEnum)
  // role: RolesEnum;
}
