import { IGymInfo } from "@/entities/gym";
import { ICreateOrganisation } from "../../model/types/create-organisation";

export type GymItem = Omit<IGymInfo, "organisationName">;

export type GymList = GymItem[];

export interface IEditOrganisationForm extends ICreateOrganisation {
  gymList: GymList;
}
