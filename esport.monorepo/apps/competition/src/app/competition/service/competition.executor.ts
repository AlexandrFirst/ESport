import { CategoryService } from '../../category/category.service';
import { ICategoryWithRounds } from '@esport.monorepo/interfaces';

export class CompetitionExecutor {
  constructor(private readonly categoryService: CategoryService) {}

  async createCategoryWithRounds(category: ICategoryWithRounds) {
    const newCategory = await this.categoryService.createWithRounds(category);
    return newCategory;
  }

  async validateCategories(categoryIds: string[]) {
    // const categories = await this.categoryService.findManyByIds(categoryIds, {
    //   id: true,
    // });
    // if (categories?.length !== categoryIds.length) {
    //   throw new Error('Categories not found');
    // }
    // return categories;
    return [];
  }
}
