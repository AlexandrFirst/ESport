import { IUser } from '@esport.monorepo/interfaces';
import { Injectable } from '@nestjs/common';

import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  create(user: IUser) {
    return this.userRepo.create(new UserEntity(user));
  }
}
