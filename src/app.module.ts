import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { userModule } from './user/user.module';
import { authModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, userModule, authModule],
})
export class AppModule {}
