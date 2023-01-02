import { IsString } from "class-validator";
import { ICompetition } from "../../interfaces";

export namespace CompetitionsPublicInfo {
  export const topic = "competitions.public-info.command";

  export class Request {
    @IsString()
    id: string;
  }

  export class Response {
    competition: ICompetition;
  }
}
