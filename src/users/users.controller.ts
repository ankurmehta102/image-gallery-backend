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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalAuthGuard } from 'src/guards/localAuthGuard.guard';
import { RolesEnum } from './entities/user.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roleGuard.guard';
import { ConfigService } from '@nestjs/config';

@UseGuards(LocalAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private configService: ConfigService,
  ) {}

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    const port = this.configService.get('port');
    console.log(port);
    return;
    // return this.usersService.create(createUserDto);
  }

  @Roles(RolesEnum.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userName')
  findOne(@Param('userName') userName: string) {
    return this.usersService.findOneByUserName(userName);
  }

  @Patch(':userId')
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':userId')
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
