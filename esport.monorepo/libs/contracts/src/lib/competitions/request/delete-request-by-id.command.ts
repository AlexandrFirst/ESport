import { IsNumber } from 'class-validator';

import { Request as DBRequest } from '@prisma/client';

export namespace DeleteRequestByIdCommand {
  export const topic = 'competitions.request-delete-by-id.command';

  export class Request {
    @IsNumber()
    id: number;
  }

  export class Response {
    deletedRequest: DBRequest;
  }
}
