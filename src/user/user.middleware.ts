import {
  Injectable,
  NestMiddleware,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { type } from 'os';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params['id']);

      if (isNaN(id)) {
        res.status(400).json({ message: 'ID precisa ser um número!' });
        return;
      }

      const data = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!data) {
        res.status(404).json({ message: 'ID não encontrado' });
        return;
      }

      res.status(200);
      next();
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Ocorreu um erro, tente novamente mais tarde' });
    }
  }
}
