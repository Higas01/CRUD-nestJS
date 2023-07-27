import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { authService } from './auth.service';
import { createUserDTO } from 'src/dto/createUser.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class authController {
  constructor(private authService: authService) {}

  @HttpCode(200)
  @Post('')
  signIn(@Body() { email, password }: createUserDTO) {
    return this.authService.signIn(email, password);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  GetTest(): string {
    return `Hello word`;
  }
}
