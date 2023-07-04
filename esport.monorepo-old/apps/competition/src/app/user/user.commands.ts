import { Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';

import { UserCreate } from '@esport.monorepo/contracts';

import { UserService } from './user.service';

@Controller()
export class UserCommands {
  constructor(private readonly userService: UserService) {}

  @RMQValidate()
  @RMQRoute(UserCreate.topic)
  async createUser(req: UserCreate.Request): Promise<UserCreate.Response> {
    const newUser = await this.userService.create(req);
    return { user: newUser };
  }
}
