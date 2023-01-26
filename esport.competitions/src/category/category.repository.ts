import { Injectable } from '@nestjs/common';

import { isObjectIdOrHexString, Model, ProjectionType } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { EntityRepository } from '../database/entity.repository';
import { Category } from './category.model';
import { CategoryEntity } from './category.entity';

@Injectable()
export class CategoryRepository extends EntityRepository<Category> {
  constructor(
    @InjectModel(Category.name)
    readonly categoryModel: Model<Category>,
  ) {
    super(categoryModel);
  }

  async update({ _id, fights, ...rest }: CategoryEntity) {
    const fightToUpdate = fights?.map((f) => f._id);
    return this.categoryModel
      .updateOne({ _id }, { $set: { ...rest, fights: fightToUpdate } })
      .exec();
  }

  async findByIdWithPopulate(
    _id: string,
    projection?: ProjectionType<CategoryEntity>,
  ) {
    if (!isObjectIdOrHexString(_id)) {
      throw new Error('Invalid id');
    }
    return this.entityModel
      .findOne({ _id }, projection)
      .populate('fights')
      .exec();
  }
}
