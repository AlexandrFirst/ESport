import { Competition } from '@prisma/client';

export namespace CompetitionCreateCommand {
  export const topic = 'competitions.create-competition.command';

  export class Request {
    competition: Competition;
  }

  export class Response {}
}
