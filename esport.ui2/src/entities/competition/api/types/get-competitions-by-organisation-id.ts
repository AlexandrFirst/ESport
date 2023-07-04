import { ICompetitonCommon } from "../../model/types/competiton";

export interface ICompetitionWithOrganisationAndCreator
  extends ICompetitonCommon {
  creator: {
    id: number;
    name: string;
  };
}
