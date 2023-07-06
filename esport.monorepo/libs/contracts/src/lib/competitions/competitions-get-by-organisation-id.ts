import type { Competition, Organisation } from '@prisma/client';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export namespace CompetitionsGetByOrganisationId {
  export const topic = 'competitions.get-by-organisation-id.query';

  export class Request {
    @IsNumber()
    organisationId: number;

    @IsOptional()
    @IsBoolean()
    includeClosedRegistration?: boolean;
  }

  export class Response {
    organisation: Organisation;
    competitions: Competition[];
  }
}
