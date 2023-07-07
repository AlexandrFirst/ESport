import { Competitor } from '@prisma/client';
import { IsNumber } from 'class-validator';

export namespace FindCompetitorRecordsByUserIdQuery {
  export const topic = 'competitions.find-competitor-records.query';

  export class Request {
    @IsNumber()
    userId: number;
  }

  export class Response {
    userCompetitorRecords: Competitor[];
    isApplied?: boolean;
  }
}
