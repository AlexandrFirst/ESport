import { Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { IUser } from '@esport.monorepo/interfaces';

import { UserService } from './user.service';

@Controller()
export class UserEvents {
  constructor(private readonly userService: UserService) {}

  //TODO: insert user created event topic
  @RMQValidate()
  @RMQRoute('')
  async getUserCreatedEvent(user: IUser) {
    return this.userService.create(user);
  }
}
