import { HttpException, Injectable, HttpStatus, Res } from '@nestjs/common';
import { createUserDTO } from 'src/dto/createUser.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { updateUserDTO } from 'src/dto/updateUser.dto';

@Injectable()
export class userService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser({ name, email, password }: createUserDTO, @Res() res) {
    try {
      const salt = 10;
      const passwordHash = await bcrypt.hash(password, salt);
      const data = await this.prisma.user.create({
        data: {
          name,
          email,
          password: passwordHash,
        },
      });

      res.status(201).json(data);
    } catch (error) {
      res
        .json(500)
        .json({ message: 'Ocorreu algum erro, tente novamente mais tarde' });
    }
  }

  async getUsers() {
    try {
      return this.prisma.user.findMany();
    } catch (error) {
      throw new HttpException(
        'Ocorreu algum erro, tente novamente mais tarde',
        500,
      );
    }
  }

  async getUserID(id: number, @Res() res) {
    try {
      const data = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Ocorreu algum erro, tente novamente mais tarde' });
    }
  }

  async updateUser(
    id: number,
    { name, email, password }: updateUserDTO,
    @Res() res,
  ) {
    try {
      const data = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          password,
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      res
        .status(400)
        .json({ message: 'Ocorreu algum erro, tente novamente mais tardeeee' });
    }
  }

  async deleteUser(id: number, @Res() res) {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  }
}
