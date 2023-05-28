import { ITrainerSportInfo } from "@/entities/profile";
import { IGymInfo } from "@/entities/gym";

export interface RoleProfileInformationState {
  trainerSports: ITrainerSportInfo[];
  gymAdminGyms: IGymInfo[];
  organisationAdminOrganisationId: number;
}
