import { Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';

import { CompetitionsCreateCompetition } from 'esport-lib-ts/lib/competitions';
import { CompetitionEntity } from './entities/competition.entity';
import { CompetitionRepository } from './repositories/competition.repository';

@Controller()
export class CompetitionCommands {
  constructor(private readonly competitionRepository: CompetitionRepository) {}

  @RMQValidate()
  @RMQRoute(CompetitionsCreateCompetition.topic)
  async createCompetition({
    dateStartStr,
    dateEndStr,
    categories,
    ...rest
  }: CompetitionsCreateCompetition.Request): Promise<CompetitionsCreateCompetition.Response> {
    const dateStart = new Date(dateStartStr);
    const dateEnd = dateEndStr ? new Date(dateEndStr) : undefined;
    const newComp = new CompetitionEntity({
      ...rest,
      dateStart,
      dateEnd,
      categories: categories ?? [],
    });
    const res = await this.competitionRepository.create(newComp);
    return { _id: res._id };
  }
}
