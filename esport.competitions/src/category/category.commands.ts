import { Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';

import { CategoryCreate, IFight } from 'esport-lib-ts/lib/competitions';

import { CategoryService } from './category.service';
import { FightService } from '../fight/fight.service';

import { CategoryUpdate } from '../_TEMP/category/commands/category.update-category.command';

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
    if (fights) {
      await Promise.all(
        fights.map(async (fight) => {
          if (fight._id) {
            await this.fightService.update(fight);
          } else {
            await this.fightService.create(fight as IFight);
          }
        }),
      );
    }
    return this.categoryService.update({
      _id,
      title,
      fights:
        fights.map((f) => ({
          ...f,
          isProcessed: f.isProcessed ?? false,
          accNumber: f.accNumber ?? 0,
          competitors: f.competitors ?? [],
        })) ?? [],
    });
  }
}
