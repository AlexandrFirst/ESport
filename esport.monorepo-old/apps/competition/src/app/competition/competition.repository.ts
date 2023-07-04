import { ICompetition } from '@esport.monorepo/interfaces';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  FilterQuery,
  isObjectIdOrHexString,
  Model,
  ProjectionType,
} from 'mongoose';

import { EntityRepository } from '../database/entity.repository';

import { CompetitionEntity } from './competition.entity';
import { Competition } from './models/competition.model';

@Injectable()
export class CompetitionRepository extends EntityRepository<Competition> {
  constructor(
    @InjectModel(Competition.name)
    readonly model: Model<Competition>
  ) {
    super(model);
  }

  async update({ _id, ...rest }: CompetitionEntity) {
    return this.model.updateOne({ _id }, { $set: { ...rest } }).exec();
  }

  async findWithPopulate(
    entityFilterQuery: FilterQuery<Competition>,
    projection?: ProjectionType<ICompetition>
  ) {
    return this.model
      .find(entityFilterQuery, projection)
      .populate('categories')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findByIdWithPopulate(
    _id: string,
    projection?: ProjectionType<ICompetition>
  ) {
    if (!isObjectIdOrHexString(_id)) {
      throw new Error('Invalid id');
    }
    return this.model
      .findById(_id, projection)
      .populate({
        path: 'categories',
        populate: {
          path: 'rounds',
          populate: {
            path: 'fights',
            model: 'Fight',
            // populate: {
            // path: 'competitors.userId',
            // model: 'User',
            // },
          },
        },
      })
      .exec();
  }
}
