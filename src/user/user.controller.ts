import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { createUserDTO } from 'src/dto/createUser.dto';
import { userService } from './user.service';
import { updateUserDTO } from 'src/dto/updateUser.dto';
import { Response } from '@nestjs/common';

@Controller()
export class userController {
  constructor(private readonly user: userService) {}

  @HttpCode(201)
  @Post('create')
  async createUser(
    @Body() { name, email, password }: createUserDTO,
    @Res() res: Response,
  ) {
    return this.user.createUser({ name, email, password }, res);
  }

  @Get()
  async getUsers() {
    return this.user.getUsers();
  }

  @HttpCode(200)
  @Get(':id')
  async getUserID(@Param('id', ParseIntPipe) id, @Res() res) {
    return this.user.getUserID(id, res);
  }

  @Put('update/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() { name, email, password }: updateUserDTO,
    @Res() res,
  ) {
    return this.user.updateUser(id, { name, email, password }, res);
  }

  @Delete(':id/delete')
  async deleteUser(@Param('id', ParseIntPipe) id: number, @Res() res) {
    return this.user.deleteUser(id, res);
  }
}
