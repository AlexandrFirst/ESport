import { Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';

import {
  CompetitionsGetAll,
  CompetitionsGetById,
} from '@esport.monorepo/contracts';
import { ESportError } from '../../error/error';

import { CompetitionService } from '../service/competition.service';

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
      throw new ESportError('Competition not found', 400);
    }
    return { competition };
  }
}
