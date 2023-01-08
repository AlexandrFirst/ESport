import { IsString } from "class-validator";
import { ICompetition } from "../../interfaces";

export namespace CompetitionPublicInfo {
  export const topic = "competition.public-info.command";

  export class Request {
    @IsString()
    id: string;
  }

  export class Response {
    competition: ICompetition;
  }
}
