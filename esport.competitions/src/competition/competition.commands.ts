import { Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';

import { CompetitionCreate } from 'esport-lib-ts/lib/competitions';

import { Category } from '../category/category.model';
import { CategoryService } from '../category/category.service';

import { CompetitionService } from './competition.service';
import { CompetitionExecutor } from './competition.executor';

@Controller()
export class CompetitionCommands {
  private competitionExecutor: CompetitionExecutor;

  constructor(
    private readonly competitionService: CompetitionService,
    private readonly categoryService: CategoryService,
  ) {
    this.competitionExecutor = new CompetitionExecutor(this.categoryService);
  }

  @RMQValidate()
  @RMQRoute(CompetitionCreate.topic)
  async createCompetition(
    req: CompetitionCreate.Request,
  ): Promise<CompetitionCreate.Response> {
    let categories: Category[] = [];
    if (req.categoryIds) {
      categories = await this.competitionExecutor.validateCategories(
        req.categoryIds,
      );
    }
    const { id } = await this.competitionService.createCompetition({
      ...req,
      dateStart: new Date(req.dateStart),
      dateEnd: req.dateEnd ? new Date(req.dateEnd) : undefined,
      categories,
    });
    return { id };
  }
}
