import { Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';

import {
  CategoryCreate,
  CategoryUpdate,
  IFight,
} from 'esport-lib-ts/lib/competitions';

import { CategoryService } from './category.service';
import { FightService } from '../fight/fight.service';

@Controller()
export class CategoryCommands {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly fightService: FightService,
  ) {}

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
    _id,
    title,
    fights,
  }: CategoryUpdate.Request): Promise<CategoryUpdate.Response> {
    const cat = await this.categoryService.findById(_id);
    if (!cat) {
      throw new Error('Category not found');
    }
    let newFights: IFight[] = [];
    if (fights) {
      newFights = await this.fightService.updateOrCreateMany(fights);
    }
    return this.categoryService.update({
      _id,
      title,
      fights: fights ? newFights : undefined,
    });
  }
}