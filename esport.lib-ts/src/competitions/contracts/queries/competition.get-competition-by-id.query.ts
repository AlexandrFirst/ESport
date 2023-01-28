import { IsString } from "class-validator";
import { ICompetition } from "../../interfaces";

export namespace CompetitionsGetById {
  export const topic = "competitions.competition.get-competition-by-id.query";

  export class Request {
    @IsString()
    _id: string;
  }

  export class Response {
    competition: ICompetition;
  }
}
