import { Injectable } from '@nestjs/common';

import { ICategory } from 'esport-lib-ts/lib/competitions';

import { CategoryRepository } from './category.repository';
import { CategoryEntity } from './category.entity';
import { CategoryEventEmitter } from './category.event-emitter';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly eventEmitter: CategoryEventEmitter,
  ) {}

  async findManyByIds(ids: string[], projection?: Record<string, unknown>) {
    return this.categoryRepository.find({ _id: { $in: ids } }, projection);
  }

  async findById(_id: string) {
    return this.categoryRepository.findById(_id);
  }

  async create(c: ICategory) {
    const newCategory = new CategoryEntity(c);
    return this.categoryRepository.create(newCategory);
  }

  async update({ _id, title, fights }: Partial<ICategory>) {
    const cat = await this.categoryRepository.findById(_id);
    if (!cat) {
      throw new Error('Category not found');
    }
    await this.updateCategory(
      new CategoryEntity(cat).updateCategoryData({
        title,
        fights,
      }),
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
