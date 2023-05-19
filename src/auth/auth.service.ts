import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async login(username: string, password: string) {
    const existedUser = await this.userService.findOneByUserName(username);
    if (!existedUser) {
      throw new BadRequestException('User not found.');
    }
    if (existedUser.password !== password) {
      throw new UnauthorizedException('Incorrect Password!');
    }
    const { password: actualPassword, ...userWithoutPassword } = existedUser;
    const payload = { username, sub: existedUser?.id };

    return {
      usersDetails: userWithoutPassword,
      tokens: {
        access_token: await this.jwtService.signAsync(payload),
      },
    };
  }
}
