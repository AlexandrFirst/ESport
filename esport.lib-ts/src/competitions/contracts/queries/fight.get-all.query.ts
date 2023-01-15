import { IFight } from "../../interfaces";

export namespace FightGetAll {
  export const topic = "competitions.fight.get-all.query";

  export class Request {}

  export class Response {
    fights: IFight[];
  }
}
