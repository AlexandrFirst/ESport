import { ExerciseRelationModel } from "./exercise-relation-model";

export interface IExerciseInfo {
  name: string;
  description: string;
  sportRelations: ExerciseRelationModel[];
  traumaRelations: ExerciseRelationModel[];
  bodypartRelation: ExerciseRelationModel[];
  exerciseTutorialLinks: number[];
}
