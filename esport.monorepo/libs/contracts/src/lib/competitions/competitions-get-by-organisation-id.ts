import type { Competition, Organisation } from '@prisma/client';
import { IsNumber } from 'class-validator';

export namespace CompetitionsGetByOrganisationId {
  export const topic = 'competitions.get-by-organisation-id.query';

  export class Request {
    @IsNumber()
    organisationId: number;
  }

  export class Response {
    organisation: Organisation;
    competitions: Competition[];
  }
}
