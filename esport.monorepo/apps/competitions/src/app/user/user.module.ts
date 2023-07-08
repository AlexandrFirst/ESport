import { Module } from '@nestjs/common';

import { PrismaModule } from '../database/prisma.module';

import { UserEvents } from './user.events';
import { UserQueries } from './user.queries';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [PrismaModule],
  controllers: [UserEvents, UserQueries],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
