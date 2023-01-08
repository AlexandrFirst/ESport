import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
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

  async update({ _id, ...rest }: CategoryEntity) {
    return this.categoryModel.updateOne({ _id }, { $set: { ...rest } }).exec();
  }
}
