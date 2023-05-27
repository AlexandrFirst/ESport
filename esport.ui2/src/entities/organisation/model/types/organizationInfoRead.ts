import { IGymReadInfo, IGymTrainerInfo } from "@/entities/gym";

export interface IOrganizationInfoRead {
  organisationId: number;
  name: string;
  address: string;
  organisationGymInfos: IGymReadInfo[];
  organisationAdministartors: IGymTrainerInfo[];
}
