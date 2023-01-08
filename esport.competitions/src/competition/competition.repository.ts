import { Injectable } from '@nestjs/common';

import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { ICompetition } from 'esport-lib-ts/lib';

import { EntityRepository } from '../database/entity.repository';

import { Competition } from './competition.model';
import { CompetitionEntity } from './competition.entity';

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

  async findWithPopulate(
    entityFilterQuery: FilterQuery<Competition>,
    projection?: Record<string, ICompetition>,
  ) {
    return this.competitionModel
      .find(entityFilterQuery, projection)
      .populate('categories')
      .exec();
  }

  async test(c: ICompetition) {}
}
