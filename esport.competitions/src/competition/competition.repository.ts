import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Competition } from './competition.model';
import { CompetitionEntity } from './competition.entity';
import { EntityRepository } from '../database/entity.repository';
import { ICompetition } from 'esport-lib-ts/lib';

@Injectable()
export class CompetitionRepository extends EntityRepository<Competition> {
  constructor(
    @InjectModel(Competition.name)
    readonly competitionModel: Model<Competition>,
  ) {
    super(competitionModel);
  }

  async update({ _id, ...rest }: CompetitionEntity) {
    return this.competitionModel
      .updateOne({ _id }, { $set: { ...rest } })
      .exec();
  }

  async test(c: ICompetition) {}
}
