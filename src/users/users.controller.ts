import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalAuthGuard } from '../guards/localAuthGuard.guard';
import { RolesEnum } from './entities/user.entity';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roleGuard.guard';
import { CheckUserId } from '../interceptors/checkUserId.interceptors';

@UseGuards(LocalAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles(RolesEnum.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Roles(RolesEnum.ADMIN)
  @UseGuards(RolesGuard)
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usersService.findOneByUserName(email);
  }

  @Patch(':userId')
  @UseInterceptors(CheckUserId)
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  @UseInterceptors(CheckUserId)
  remove(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.remove(userId);
  }
  @Roles(RolesEnum.ADMIN)
  @UseGuards(RolesGuard)
  @Patch('upgrade-to-admin/:userId')
  upgradeToAdmin(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.upgradeToAdmin(userId);
  }
}
