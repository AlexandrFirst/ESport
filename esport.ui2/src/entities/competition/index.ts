import exp from "constants";

export { Competition } from "./ui/Competition/Competition";
export { CreateCompetitionCard } from "./ui/CreateCompetitionCard/CreateCompetitionCard";
export { CompetitionGrid } from "./ui/CompetitionGrid/CompetitionGrid";

export { CompetitionApi } from "./api/competitionApi";
export { competitionQueryKeys } from "./api/hooks/competitionQueryKeys";
export { useCreateCompetition } from "./api/hooks/useCreateCompetition";
export { useGetAllCompetitions } from "./api/hooks/useGetAllCompetitions";
export {
  useCompetitionsByOrganisationId,
  getCompetitionsByOrganisationId,
} from "./api/hooks/useGetCompetitionsByOrganisationId";
export {
  useCompetitionWithOrganisation,
  getCompetitionWithOrganisation,
} from "./api/hooks/useGetCompetitionWithCategories";
export {
  getCompetitorRecords,
  useGetCompetitorRecords,
} from "./api/hooks/useGetCompetitorRecords";
export { useCreateCompetitionRequest } from "./api/hooks/useCreateCompetitionRequest";

// types
export type {
  ICompetitonOld,
  ICompetitonWithCategories,
  ICompetition,
} from "./model/types/competiton";
export type {
  ICategoryWithRoundsOld,
  ICategoryOld,
} from "./model/types/category";
export type { IRoundWithFightsOld, IRoundOld } from "./model/types/round";
export type { IFightOld } from "./model/types/fight";
export type { CompetitionOrganisation } from "./model/types/competition-organisation";
export type { ICompetitor } from "./model/types/competitor";
export type { CompetitionRequest } from "./model/types/competition-request";

export { CompetitorType } from "./consts/competitor-type";
