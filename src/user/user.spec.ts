import { userController } from './user.controller';
import { userService } from './user.service';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { Body, Res, Response } from '@nestjs/common';
import { createUserDTO } from '../dto/createUser.dto';

describe('UserController', () => {
  let UserController: userController;
  let UserService: userService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [userController],
      providers: [userService, PrismaService],
    }).compile();

    UserService = moduleRef.get<userService>(userService);
    UserController = moduleRef.get<userController>(userController);
    prisma = moduleRef.get<PrismaService>(PrismaService);
  });

  describe('Exibir usuários', () => {
    it('Exibir todos usuários', async () => {
      const user = [
        {
          id: 1,
          name: 'Higor',
          email: 'higor.porangaba@hotmail.com',
        },
        {
          id: 2,
          name: 'Medeiros',
          email: 'Medeiros.porangaba@hotmail.com',
        },
        {
          id: 3,
          name: 'Joaquim',
          email: 'joaquim.porangaba@hotmail.com',
        },
      ];

      jest.spyOn(UserService, 'getUsers').mockImplementation(async () => user);

      const result = await UserController.getUsers();

      expect(result).toBe(user);
    });
  });

  describe('Criar usuário', () => {
    it('Criando um usuário com todas informações', async () => {
      const user: createUserDTO = {
        name: 'Higor',
        email: 'higor.porangaba123@hotmail.com',
        password: '123senha',
      };

      const { name, email, password }: createUserDTO = user;

      jest.spyOn(UserService, 'createUser').mockResolvedValue(user);

      const result = await UserController.createUser({ name, email, password });

      expect(result).toEqual(user);
    });
  });
});
