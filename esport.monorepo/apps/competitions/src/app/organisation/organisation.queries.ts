import { Controller } from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import {
  AppError,
  CompetitionsGetByOrganisationId,
} from '@esport.monorepo/contracts';

@Controller()
export class OrganisationQueries {
  constructor(private readonly organisationService: OrganisationService) {}

  @RMQValidate()
  @RMQRoute(CompetitionsGetByOrganisationId.topic)
  async findAll({
    organisationId,
  }: CompetitionsGetByOrganisationId.Request): Promise<CompetitionsGetByOrganisationId.Response> {
    const organisation = await this.organisationService.findById(
      organisationId,
      { includeCompetitions: true, includeCompetitionCreator: true }
    );
    if (!organisation) {
      throw new AppError(
        `Organisation with id ${organisationId} not found`,
        400
      );
    }
    const { competitions, ...org } = organisation;
    return { organisation: org, competitions };
  }
}
