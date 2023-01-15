import { Injectable } from '@nestjs/common';

import { FilterQuery, Model, ProjectionType } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { ICompetition } from 'esport-lib-ts/lib/competitions';

import { EntityRepository } from '../database/entity.repository';

import { Competition } from './competition.model';
import { CompetitionEntity } from './competition.entity';

@Injectable()
export class CompetitionRepository extends EntityRepository<Competition> {
  constructor(
    @InjectModel(Competition.name)
    readonly model: Model<Competition>,
  ) {
    super(model);
  }

  async update({ _id, ...rest }: CompetitionEntity) {
    return this.model.updateOne({ _id }, { $set: { ...rest } }).exec();
  }

  async findWithPopulate(
    entityFilterQuery: FilterQuery<Competition>,
    projection?: ProjectionType<ICompetition>,
  ) {
    return this.model
      .find(entityFilterQuery, projection)
      .populate('categories')
      .exec();
  }
}
