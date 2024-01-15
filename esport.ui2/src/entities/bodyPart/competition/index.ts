export { Competition } from "./ui/Competition/Competition";
export { CreateCompetitionCard } from "./ui/CreateCompetitionCard/CreateCompetitionCard";
export { CompetitionGrid } from "./ui/CompetitionGrid/CompetitionGrid";

export { CompetitionApi } from "./api/competitionApi";
export { useCreateCompetition } from "./api/hooks/useCreateCompetition";
export { useGetAllCompetitions } from "./api/hooks/useGetAllCompetitions";

export type {
  ICompetiton,
  ICompetitonWithCategories,
} from "./model/types/competiton";
export type { ICategoryWithRounds, ICategory } from "./model/types/category";
export type { IRoundWithFights, IRound } from "./model/types/round";
export type { IFight } from "./model/types/fight";

export { CompatitorType } from "./consts/competitor-type";
