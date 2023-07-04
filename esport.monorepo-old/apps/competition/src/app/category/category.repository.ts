import { Injectable } from '@nestjs/common';

import { isObjectIdOrHexString, Model, ProjectionType } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { EntityRepository } from '../database/entity.repository';

import { CategoryEntity } from './category.entity';
import { Category } from './models/category.model';

@Injectable()
export class CategoryRepository extends EntityRepository<Category> {
  constructor(
    @InjectModel(Category.name)
    readonly categoryModel: Model<Category>
  ) {
    super(categoryModel);
  }

  async update({ _id, ...rest }: CategoryEntity) {
    // const fightToUpdate = fights?.map((f) => f._id);
    return this.categoryModel
      .findByIdAndUpdate(_id, rest, { new: true })
      .exec();
  }

  async findByIdWithPopulate(
    _id: string,
    projection?: ProjectionType<CategoryEntity>
  ) {
    if (!isObjectIdOrHexString(_id)) {
      throw new Error('Invalid id');
    }
    return this.entityModel
      .findOne({ _id }, projection)
      .populate('rounds')
      .exec();
  }
}
