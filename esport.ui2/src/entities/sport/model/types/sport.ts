import { SportType } from "../../constants/sport-type";

export interface ISport {
  id: number;
  type: SportType;
  name: string;
  description: string;
}
