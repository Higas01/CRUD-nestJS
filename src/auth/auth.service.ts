import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class authService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    const pass = await bcrypt.compare(password, user.password);

    if (!user) {
      throw new HttpException('Usuário não encontrado', 404);
    }

    if (!pass) {
      throw new UnauthorizedException();
    }

    const token = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        expiresIn: '7d',
      },
    );
    return token;
  }
}
