import { Controller } from '@nestjs/common';
import { RMQRoute } from 'nestjs-rmq';

import { UserService } from './user.service';
import { IUser } from 'esport-lib-ts/lib/competitions/interfaces/user.interface';

@Controller()
export class UserEvents {
  constructor(private readonly userService: UserService) {}

  //TODO: to confirm with Sasha
  @RMQRoute('user-created')
  async userCreated(u: IUser) {
    await this.userService.create(u);
  }
}
