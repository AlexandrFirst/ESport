import { Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';

import { CompetitionsPublicInfo } from '@esport-lib/competitions';

@Controller()
export class CompetitionQueries {
  @RMQValidate()
  @RMQRoute(CompetitionsPublicInfo.topic)
  async getCompetitions({
    id,
  }: CompetitionsPublicInfo.Request): Promise<CompetitionsPublicInfo.Response> {
    return { competition: {} as any };
  }
}
