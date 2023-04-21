import { CategoryService } from '../category/category.service';

export class CompetitionExecutor {
  constructor(private readonly categoryService: CategoryService) {}

  async validateCategories(categoryIds: string[]) {
    const categories = await this.categoryService.findManyByIds(categoryIds, {
      id: true,
    });
    if (categories?.length !== categoryIds.length) {
      throw new Error('Categories not found');
    }
    return categories;
  }
}
