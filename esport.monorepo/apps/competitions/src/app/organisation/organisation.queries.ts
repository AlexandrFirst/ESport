import { Controller, Logger } from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import {
  BadRequestError,
  CompetitionsGetByOrganisationId,
} from '@esport.monorepo/contracts';

@Controller()
export class OrganisationQueries {
  constructor(private readonly organisationService: OrganisationService) {}

  @RMQValidate()
  @RMQRoute(CompetitionsGetByOrganisationId.topic)
  async findAll({
    organisationId,
    includeClosedRegistration,
  }: CompetitionsGetByOrganisationId.Request): Promise<CompetitionsGetByOrganisationId.Response> {
    const organisation = await this.organisationService.findById(
      organisationId,
      {
        includeCompetitions: true,
        includeCompetitionCreator: true,
        includeClosedRegistration,
      }
    );
    if (!organisation) {
      throw new BadRequestError(
        `Organisation with id ${organisationId} not found`
      );
    }
    const { competitions, ...org } = organisation;
    return { organisation: org, competitions };
  }
}
