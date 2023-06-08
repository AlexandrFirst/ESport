import { ITrainerSportInfo } from "@/entities/trainer";
import { ITrauma } from "@/entities/trauma";
import { IBodyPart } from "@/entities/bodyPart";

export interface ICreateExerciseForm {
  name: string;
  description: string;
  sports: ITrainerSportInfo[];
  traumas: ITrauma[];
  bodyParts: IBodyPart[];
  isPublic: boolean;
}
