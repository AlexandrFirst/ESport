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
    let categories: Category[] = [];
    if (req.categoryIds) {
      categories = await this.competitionExecutor.validateCategories(
        req.categoryIds
      );
    }
    // console.log('===categories  ===', categories);
    const comp = await this.competitionService.createCompetition({
      ...req,
      dateStart: new Date(req.dateStart),
      dateEnd: req.dateEnd ? new Date(req.dateEnd) : undefined,
      categories: [],
    });
    return { competition: comp };
  }
}
