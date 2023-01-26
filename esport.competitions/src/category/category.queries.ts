import { Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';

import { CategoryService } from './category.service';
import { CategoriesGetById } from '../_TEMP/category/queries/category.get-category-by-id.query';

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
