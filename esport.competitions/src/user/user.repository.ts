import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { EntityRepository } from '../database/entity.repository';

import { User } from './user.model';

@Injectable()
export class UserRepository extends EntityRepository<User> {
  constructor(
    @InjectModel(User.name)
    readonly model: Model<User>,
  ) {
    super(model);
  }
}
