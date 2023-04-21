import { CategoriesGetById } from '@esport.monorepo/contracts';
import { Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';

import { CategoryService } from '../category.service';

@Controller()
export class CategoryQueries {
  constructor(private readonly categoryService: CategoryService) {}

  @RMQValidate()
  @RMQRoute(CategoriesGetById.topic)
  async getCategoryById({
    _id,
  }: CategoriesGetById.Request): Promise<CategoriesGetById.Response> {
    const category = await this.categoryService.findByIdWithPopulate(_id);
    return { category };
  }
}
