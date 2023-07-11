import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RolesEnum, User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

let service: UsersService;
let userRepository: Repository<User>;
const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

const omit = (object: any, keys: string[]) => {
  const keysArray = Object.keys(object);
  const updatedObj: any = {};
  keysArray.map((key: any) => {
    if (!keys.includes(key)) {
      updatedObj[key] = object[key];
    }
  });
  return updatedObj;
};

const testUsers = (lastName: string | null) => {
  return {
    id: 1,
    userName: 'ankur',
    password: '12345',
    lastName: lastName,
    firstName: 'ankur',
    role: RolesEnum.USER,
  };
};

beforeEach(async () => {
  const module = await Test.createTestingModule({
    providers: [
      UsersService,
      {
        provide: USER_REPOSITORY_TOKEN,
        useValue: {
          findOneBy: jest.fn(),
          create: jest.fn(),
          save: jest.fn(),
        },
      },
    ],
  }).compile();
  service = module.get<UsersService>(UsersService);
  userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
});

it('UserService should be defined', async () => {
  expect(service).toBeDefined();
});

it('UserRepository should be defined', async () => {
  expect(userRepository).toBeDefined();
});

it('password property should not exist', async () => {
  userRepository.save = jest.fn().mockImplementation(() => {
    return testUsers(null);
  });
  const user = await service.create({
    userName: 'ankur',
    firstName: 'mehta',
    password: '12345',
  });
  expect(user).not.toHaveProperty('password');
});

it('lastName should be null', async () => {
  userRepository.save = jest.fn().mockImplementation(() => {
    return testUsers(null);
  });
  const user = await service.create({
    userName: 'ankur',
    firstName: 'mehta',
    password: '12345',
  });
  expect(user.lastName).toEqual(null);
});

it('lastName should not be null', async () => {
  userRepository.save = jest.fn().mockImplementation(() => {
    return testUsers('Mehta');
  });
  const user = await service.create({
    userName: 'ankur',
    firstName: 'ankur',
    lastName: 'Mehta',
    password: '12345',
  });
  expect(user.lastName).toEqual('Mehta');
});

it('user already exist', async () => {
  userRepository.findOneBy = jest
    .fn()
    .mockImplementation(() => [testUsers(null)]);
  await expect(
    service.create({
      userName: 'ankur',
      firstName: 'ankur',
      password: '12345',
    }),
  ).rejects.toThrow(new BadRequestException('User Already Exist'));
});
