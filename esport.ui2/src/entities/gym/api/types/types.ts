import { IGymReadInfo } from "../../model/types/gym-read-info";

export interface IGymFiltrationModel {
  gymIds?: number[];
  organisationIds?: number[];
  name?: string;
  address?: string;
  openHour?: Date;
  closeHour?: Date;
  page?: number;
  pageSize?: number;
}

export interface IGymListingRequest {
  gymFiltrationModel: IGymFiltrationModel;
}

export interface IGymListingResponse {
  gymReadInfos: IGymReadInfo[];
}
