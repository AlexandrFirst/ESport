import { Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { CompetitionsGetById, NotFoundError } from '@esport.monorepo/contracts';

import { CompetitionService } from './competition.service';
import { OrganisationService } from '../organisation/organisation.service';

@Controller()
export class CompetitionQuery {
  constructor(
    private readonly competitionService: CompetitionService,
    private readonly organisationService: OrganisationService
  ) {}

  @RMQValidate()
  @RMQRoute(CompetitionsGetById.topic)
  async findById({
    competitionId,
  }: CompetitionsGetById.Request): Promise<CompetitionsGetById.Response> {
    const competition = await this.competitionService.findById(competitionId);
    if (!competition) {
      throw new NotFoundError(`Competition with id ${competitionId} not found`);
    }
    return { competition };
  }

  // @RMQValidate()
  // @RMQRoute(CompetitionsGetByOrganisationId.topic)
  // async findByOrganisationId({
  //   organisationId,
  // }: CompetitionsGetByOrganisationId.Request): Promise<CompetitionsGetByOrganisationId.Response> {
  //   const [organisation, competitions] = await Promise.all([
  //     this.organisationService.findById(organisationId),
  //     this.competitionService.findByOrganisationId(organisationId),
  //   ]);
  //   if (!organisation) {
  //     throw new Error(`Organisation with id ${organisationId} not found`);
  //   }
  //   return { organisation, competitions };
  // }
}
