import { Controller } from '@nestjs/common';
import { RMQRoute } from 'nestjs-rmq';

import { UserService } from './user.service';

@Controller()
export class UserEvents {
  constructor(private readonly userService: UserService) {}

  @RMQRoute('user.created')
  async createUser() {
    // return this.userService.create(data);
  }
}
