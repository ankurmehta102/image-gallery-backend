import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
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

  findAll() {
    return this.usersRepo.find();
  }

  findOneByUserName(userName: string) {
    return this.usersRepo.findOneBy({ userName });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
