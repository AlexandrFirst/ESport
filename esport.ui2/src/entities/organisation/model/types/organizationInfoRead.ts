import { IGymReadInfo, IGymTrainerInfo } from "@/entities/gym";
import { IOrganisation } from "./organization";

export interface IOrganizationInfoRead extends IOrganisation {
  organisationGymInfos: IGymReadInfo[];
  organisationAdministartors: IGymTrainerInfo[];
}
