import { Module } from '@nestjs/common';
import { userModule } from 'src/user/user.module';
import { authService } from './auth.service';
import { authController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    userModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    PrismaModule,
  ],
  providers: [authService],
  controllers: [authController],
})
export class authModule {}
