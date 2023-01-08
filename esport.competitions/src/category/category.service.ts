import { Injectable } from '@nestjs/common';

import { CategoryRepository } from './category.repository';
import { CategoryEntity } from './category.entity';
import { ICategory } from 'esport-lib-ts/lib';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(c: ICategory) {
    const newCategory = new CategoryEntity(c);
    return this.categoryRepository.create(newCategory);
  }

  async update({ _id, title, fights }: ICategory) {
    const cat = await this.categoryRepository.findOne({ _id });
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
      // this.eventEmitter.handle(cat),
      this.categoryRepository.update(cat),
    ]);
  }
}
