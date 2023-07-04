import { Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';

import {
  CompetitionCreate,
  CompetitionCreateWithCategories,
} from '@esport.monorepo/contracts';

import { CompetitionExecutor } from '../service/competition.executor';
import { CompetitionService } from '../service/competition.service';
import { CategoryService } from '../../category/category.service';

@Controller()
export class CompetitionCommands {
  private competitionExecutor: CompetitionExecutor;

  constructor(
    private readonly competitionService: CompetitionService,
    private readonly categoryService: CategoryService
  ) {
    this.competitionExecutor = new CompetitionExecutor(this.categoryService);
  }

  @RMQValidate()
  @RMQRoute(CompetitionCreate.topic)
  async createCompetition(
    req: CompetitionCreate.Request
  ): Promise<CompetitionCreate.Response> {
    const competition = await this.competitionService.createCompetition({
      ...req,
      categories: req.categoryIds,
    });
    return { competition };
  }

  @RMQValidate()
  @RMQRoute(CompetitionCreateWithCategories.topic)
  async createCompetitionWithCategories(
    req: CompetitionCreateWithCategories.Request
  ) {
    return this.competitionService.createCompetitionWithCategories(req);
  }
}
