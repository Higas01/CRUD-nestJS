import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { userService } from './user.service';
import { userController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserMiddleware } from './user.middleware';

@Module({
  imports: [PrismaModule],
  providers: [userService],
  controllers: [userController],
  exports: [userService],
})
export class userModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes({
      path: '/:id',
      method: RequestMethod.ALL,
    });
  }
}
