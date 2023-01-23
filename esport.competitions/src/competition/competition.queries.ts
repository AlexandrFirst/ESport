import { Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';

import {
  CompetitionsGetAll,
  CompetitionsGetById,
} from 'esport-lib-ts/lib/competitions';

import { CompetitionService } from './competition.service';

@Controller()
export class CompetitionQueries {
  constructor(private readonly competitionService: CompetitionService) {}

  @RMQRoute(CompetitionsGetAll.topic)
  async getAll() {
    return this.competitionService.getAll();
  }

  @RMQValidate()
  @RMQRoute(CompetitionsGetById.topic)
  async getById({
    _id,
  }: CompetitionsGetById.Request): Promise<CompetitionsGetById.Response> {
    const competition = await this.competitionService.findByIdWithPopulate(_id);
    if (!competition) {
      throw new Error('Competition not found');
    }
    return { competition };
  }
}
