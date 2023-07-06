import { Injectable } from '@nestjs/common';
import { OrganisationRepository } from './organisation.repository';

@Injectable()
export class OrganisationService {
  constructor(private readonly repo: OrganisationRepository) {}

  async findById(
    id: number,
    params?: {
      includeCompetitions?: boolean;
      includeCompetitionCreator?: boolean;
      includeClosedRegistration?: boolean;
    }
  ) {
    const {
      includeCompetitions = false,
      includeCompetitionCreator = false,
      includeClosedRegistration = false,
    } = params || {};
    return this.repo.findById(id, {
      include: {
        competitions: includeCompetitions
          ? {
              include: {
                creator: includeCompetitionCreator,
                organisation: true,
              },
              orderBy: {
                dateStart: 'desc',
              },
              where: {
                registrationCloseDate: {
                  gte: !includeClosedRegistration ? new Date() : undefined,
                },
              },
            }
          : false,
      },
    });
  }
}
