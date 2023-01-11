import { Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';

import { CategoryCreate, CategoryUpdate } from 'esport-lib-ts/lib';

// import { CategoryCreate } from './TEMP/category.create-category.command';
// import { CategoryUpdate } from './TEMP/category.update-category.command';
import { CategoryService } from './category.service';

@Controller()
export class CategoryCommands {
  constructor(private readonly categoryService: CategoryService) {}

  @RMQValidate()
  @RMQRoute(CategoryCreate.topic)
  async createCategory(
    req: CategoryCreate.Request,
  ): Promise<CategoryCreate.Response> {
    const { _id } = await this.categoryService.create(req);
    return { id: _id };
  }

  @RMQValidate()
  @RMQRoute(CategoryUpdate.topic)
  async updateCategory({
    id,
    title,
    fights,
  }: CategoryUpdate.Request): Promise<CategoryUpdate.Response> {
    return this.categoryService.update({
      _id: id,
      title,
      fights,
    });
  }
}
