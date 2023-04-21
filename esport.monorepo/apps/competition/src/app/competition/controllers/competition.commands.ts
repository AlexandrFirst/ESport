import { Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';

import { CompetitionCreate } from '@esport.monorepo/contracts';
import { Category } from '../../category/models/category.model';

import { CompetitionExecutor } from '../service/competition.executor';
import { CompetitionService } from '../service/competition.service';

@Controller()
export class CompetitionCommands {
  private competitionExecutor: CompetitionExecutor;

  constructor(
    private readonly competitionService: CompetitionService // private readonly categoryService: CategoryService
  ) {
    // this.competitionExecutor = new CompetitionExecutor(this.categoryService);
    this.competitionExecutor = new CompetitionExecutor();
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
}
