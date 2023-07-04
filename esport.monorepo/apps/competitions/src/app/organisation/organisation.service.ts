import { Injectable } from '@nestjs/common';
import { OrganisationRepository } from './competition.repository';

@Injectable()
export class OrganisationService {
  constructor(private readonly repo: OrganisationRepository) {}

  async findById(
    id: number,
    params?: {
      includeCompetitions?: boolean;
      includeCompetitionCreator?: boolean;
    }
  ) {
    const { includeCompetitions = false, includeCompetitionCreator = false } =
      params || {};
    return this.repo.findById(id, {
      competitions: includeCompetitions
        ? {
            include: {
              creator: includeCompetitionCreator,
            },
          }
        : false,
    });
  }
}
