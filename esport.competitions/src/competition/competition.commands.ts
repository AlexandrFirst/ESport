import { Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';

import { CompetitionCreate } from 'esport-lib-ts/lib';
import { CompetitionService } from './competition.service';

@Controller()
export class CompetitionCommands {
  constructor(private readonly competitionService: CompetitionService) {}

  @RMQValidate()
  @RMQRoute(CompetitionCreate.topic)
  async createCompetition(
    req: CompetitionCreate.Request,
  ): Promise<CompetitionCreate.Response> {
    const { _id } = await this.competitionService.createCompetition({
      ...req,
      dateStart: new Date(req.dateStart),
      dateEnd: req.dateEnd ? new Date(req.dateEnd) : undefined,
      categories: req.categories ?? [],
    });
    return { _id };
  }

  // @RMQValidate()
  // @RMQRoute('some-topic')
  // async updateCategory({ id, categories }: UpdateCategoryRequest) {
  //   return this.competitionService.updateCategory({ id, categories });
  // }
}
