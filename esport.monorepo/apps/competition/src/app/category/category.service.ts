import { ICategory } from '@esport.monorepo/interfaces';
import { Injectable } from '@nestjs/common';

import { CategoryEntity } from './category.entity';
import { CategoryEventEmitter } from './category.event-emitter';
import { CategoryRepository } from './category.repository';
import { ESportError } from '../error/error';
import { Err } from '../error/error.enum';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly eventEmitter: CategoryEventEmitter
  ) {}

  async findManyByIds(ids: string[], projection?: Record<string, unknown>) {
    return this.categoryRepository.find({ _id: { $in: ids } }, projection);
  }

  async findById(_id: string) {
    return this.categoryRepository.findById(_id);
  }

  async findByIdWithPopulate(_id: string) {
    return this.categoryRepository.findByIdWithPopulate(_id);
  }

  async create(c: ICategory) {
    const newCategory = new CategoryEntity(c);
    return this.categoryRepository.create(newCategory);
  }

  async update({ _id, title }: Partial<ICategory>) {
    const cat = await this.categoryRepository.findById(_id);
    if (!cat) {
      throw new ESportError('Category not found', Err.BAD_REQUEST);
    }
    await this.updateCategory(
      //TODO: fix this => only for compile
      new CategoryEntity(cat as any).updateCategoryData({
        title,
        // fights,
        rounds: [],
      })
    );
    return { message: 'ok' };
  }

  private async updateCategory(cat: CategoryEntity) {
    return Promise.all([
      this.eventEmitter.handle(cat),
      this.categoryRepository.update(cat),
    ]);
  }
}
