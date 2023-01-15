import { Injectable } from '@nestjs/common';

import { IUser } from 'esport-lib-ts/lib/competitions/interfaces/user.interface';

import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async create(u: IUser) {
    return this.userRepo.create(new UserEntity(u));
  }
}
