import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserEvents } from './user.events';
import { User, UserSchema } from './user.model';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

import { UserCommands } from './user.commands';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserEvents, UserCommands],
  providers: [UserService, UserRepository],
})
export class UserModule {}
