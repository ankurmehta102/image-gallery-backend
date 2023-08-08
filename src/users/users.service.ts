import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesEnum, User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { email, password } = createUserDto;
      const isUserExist = await this.usersRepo.findOneBy({
        email,
      });
      if (isUserExist) {
        throw new BadRequestException('User Already Exist');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = this.usersRepo.create({
        ...createUserDto,
        password: hashedPassword,
      });
      const { password: savedPassword, ...userWithoutPassword } =
        await this.usersRepo.save(newUser);
      return userWithoutPassword;
    } catch (error) {
      console.log('createError--->', error);
      throw error;
    }
  }

  async upgradeToAdmin(userId: number) {
    try {
      const isUserExist = await this.usersRepo.findOneBy({
        id: userId,
      });
      if (!isUserExist) {
        throw new BadRequestException('User does not exist.');
      }
      if (isUserExist?.role === RolesEnum.ADMIN) {
        throw new BadRequestException('User is already a admin.');
      }
      const newUser = this.usersRepo.create({
        ...isUserExist,
        role: RolesEnum.ADMIN,
      });
      const { password, ...userWithoutPassword } = await this.usersRepo.save(
        newUser,
      );
      return userWithoutPassword;
    } catch (error) {
      console.log('upgradeToAdminError--->', error);
      throw error;
    }
  }

  findAll() {
    return this.usersRepo.find();
  }

  async findOneByUserName(email: string) {
    const user = await this.usersRepo.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    const isUserExist = await this.usersRepo.findOneBy({
      id: userId,
    });
    if (!isUserExist) {
      throw new BadRequestException('User does not exist.');
    }
    const newUser = this.usersRepo.create({ id: userId, ...updateUserDto });
    const { password, ...userWithoutPassword } = await this.usersRepo.save(
      newUser,
    );
    return userWithoutPassword;
  }

  async remove(userId: number) {
    const isUserExist = await this.usersRepo.findOneBy({
      id: userId,
    });
    if (!isUserExist) {
      throw new BadRequestException('User does not exist.');
    }
    return this.usersRepo.delete(userId);
  }
}
