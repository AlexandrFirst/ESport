import { ICompetition } from "../../interfaces";

export namespace CompetitionsCreateCompetition {
  export const topic = "competitions.create-competition.command";

  export class Request {
    competition: ICompetition;
  }

  export class Response {
    _id: string;
  }
}
