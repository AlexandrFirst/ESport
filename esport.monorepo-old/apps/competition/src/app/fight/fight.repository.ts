import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { EntityRepository } from '../database/entity.repository';
import { Fight } from './fight.model';

@Injectable()
export class FightRepository extends EntityRepository<Fight> {
  constructor(
    @InjectModel(Fight.name)
    readonly fightModel: Model<Fight>
  ) {
    super(fightModel);
  }
}
