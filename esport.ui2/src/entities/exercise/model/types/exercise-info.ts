import { ExerciseRelationModel } from "./exercise-relation-model";

export interface IExerciseInfo {
  Name: string;
  Description: string;
  SportRelations: ExerciseRelationModel[];
  TraumaRelations: ExerciseRelationModel[];
  BodypartRelation: ExerciseRelationModel[];
  ExerciseTutorialLinks: number[];
}
