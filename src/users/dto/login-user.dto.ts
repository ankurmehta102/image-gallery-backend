import { IsNotEmpty, IsString } from 'class-validator';

export class loginUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
