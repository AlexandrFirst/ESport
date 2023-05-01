import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { EntityRepository } from '../database/entity.repository';
import { Round } from './round.model';

@Injectable()
export class RoundRepository extends EntityRepository<Round> {
  constructor(
    @InjectModel(Round.name)
    readonly fightModel: Model<Round>
  ) {
    super(fightModel);
  }
}
