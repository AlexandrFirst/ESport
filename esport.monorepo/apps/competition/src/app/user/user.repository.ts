import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EntityRepository } from '../database/entity.repository';
import { User } from './user.model';

@Injectable()
export class UserRepository extends EntityRepository<User> {
  constructor(@InjectModel(User.name) readonly userModel: Model<User>) {
    super(userModel);
  }
}
