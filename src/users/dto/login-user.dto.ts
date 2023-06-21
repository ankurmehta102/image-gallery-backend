import { IsNotEmpty, IsString } from 'class-validator';

export class loginUserDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
