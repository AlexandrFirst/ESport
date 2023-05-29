import { IGymReadInfo } from "../../model/types/gym-read-info";
import { BaseListingResult } from "@/shared/types";

export interface IGymFiltrationModel {
  gymIds?: number[];
  organisationIds?: number[];
  name?: string;
  address?: string;
  openHour?: Date;
  closeHour?: Date;
  page: number;
  pageSize: number;
}

export type IGymListingRequest = IGymFiltrationModel;

export interface IGymListingResponse extends BaseListingResult {
  gymReadInfos: IGymReadInfo[];
}
