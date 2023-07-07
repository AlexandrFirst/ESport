import { Controller } from '@nestjs/common';
import { RMQRoute } from 'nestjs-rmq';

import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Controller()
export class UserEvents {
  constructor(private readonly userService: UserService) {}

  @RMQRoute('user.created')
  async createUser(data: UserEntity) {
    return this.userService.create(data);
  }
}
