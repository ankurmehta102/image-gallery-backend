import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUserDto } from 'src/users/dto/login-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() body: loginUserDto) {
    const { userName, password } = body;
    return this.authService.login(userName, password);
  }
}
