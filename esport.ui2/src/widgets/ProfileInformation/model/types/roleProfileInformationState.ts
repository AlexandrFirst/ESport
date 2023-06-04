import { IGymInfo } from "@/entities/gym";
import { ITrainerSportInfo } from "@/entities/trainer";

export interface RoleProfileInformationState {
  trainerSports: ITrainerSportInfo[];
  gymAdminGyms: IGymInfo[];
  organisationAdminOrganisationId: number;
  newOrganisationName: string | null;
  newOrganisationDescription: string | null;
}
