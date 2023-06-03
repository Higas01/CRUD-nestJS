import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { userModule } from './user/user.module';

@Module({
  imports: [PrismaModule, userModule],
})
export class AppModule {}
