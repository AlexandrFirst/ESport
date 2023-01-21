import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { EntityRepository } from '../database/entity.repository';

import { Fight } from './fight.model';
import { FightEntity } from './fight.entity';

@Injectable()
export class FightRepository extends EntityRepository<Fight> {
  constructor(
    @InjectModel(Fight.name)
    readonly model: Model<Fight>,
  ) {
    super(model);
  }

  async findWithPopulate() {
    return this.model.find().populate('competitors').exec();
  }

  async update(entity: FightEntity) {
    return this.updateOne({ _id: entity._id }, entity);
  }
}
