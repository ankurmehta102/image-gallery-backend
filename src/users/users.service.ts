import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesEnum, User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { userName } = createUserDto;
      const isUserExist = await this.usersRepo.findOneBy({
        userName,
      });
      if (isUserExist) {
        throw new BadRequestException('User Already Exist');
      }
      const newUser = this.usersRepo.create(createUserDto);
      const { password, ...userWithoutPassword } = await this.usersRepo.save(
        newUser,
      );
      return userWithoutPassword;
    } catch (error) {
      console.log('error--->', error);
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
      console.log('error--->', error);
      throw error;
    }
  }

  findAll() {
    return this.usersRepo.find();
  }

  findOneByUserName(userName: string) {
    return this.usersRepo.findOneBy({ userName });
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
