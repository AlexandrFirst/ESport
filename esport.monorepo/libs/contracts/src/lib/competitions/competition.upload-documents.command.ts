import { Multer } from 'multer';

export namespace CompetitionsUploadDocumentsCommand {
  export const topic = 'competitions.upload-documents.command';

  export class Request {
    documents: Express.Multer.File[];
  }

  export class Response {}
}
