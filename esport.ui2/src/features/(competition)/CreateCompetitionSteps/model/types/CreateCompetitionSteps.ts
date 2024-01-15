import { ICategory, ICreateCompetitionBasicForm } from "@/entities/competition";

export interface ICreateCompetitionSteps extends ICreateCompetitionBasicForm {
  description: string;
  categories: Omit<
    ICategory,
    "id" | "createdAt" | "updatedAt" | "competitionId"
  >[];
}
