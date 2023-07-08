import { Api } from "@/shared/config";
import { ApiContext } from "@/shared/types";

import { ICreateCompetitionForm } from "../model/types/create-competitiom-form";
import { ICompetitonOld } from "../model/types/competiton";

import { GetCompetitionWithOrganisationResponse } from "./types/get-competition";
import {
  GetCompetitionsByOrganisationIdRequest,
  GetCompetitionsByOrganisationIdResponse,
} from "./types/get-competitions-by-organisation-id";
import { IOrganisation } from "@/entities/organisation";
import {
  CreateCompetitionRequest,
  GetCompetitorRecordsRequest,
  GetCompetitorRecordsResponse,
} from "./types/types";

export const CompetitionApi = (ctx?: ApiContext) => {
  const instance = Api({ ctx, baseURL: "http://localhost:3002/api/v1" });

  return {
    async createCompetition(request: ICreateCompetitionForm) {
      return instance.post("/competitions/create", request);
    },

    async getAllCompetitions() {
      return instance.get<ICompetitonOld[]>("/competitions/all");
    },

    async getCompetitionWithOrganisation(id: number) {
      return instance.get<GetCompetitionWithOrganisationResponse>(
        `/competitions/competition/${id}`
      );
    },

    async getCompetitionsByOrganisationId({
      includeClosedRegistration,
      orgId,
    }: GetCompetitionsByOrganisationIdRequest) {
      return instance.get<GetCompetitionsByOrganisationIdResponse>(
        `/competitions/organisation/${orgId}`,
        {
          params: { includeClosedRegistration },
        }
      );
    },

    getCompetitorRecords(request: GetCompetitorRecordsRequest) {
      return instance.post<GetCompetitorRecordsResponse>(
        "/competitions/getCompetitorRecords",
        request
      );
    },

    createCompetitionRequest(data: CreateCompetitionRequest) {
      return instance.post(
        "/competitions/request/createRequestWithExistingCompetitor",
        data
      );
    },
  };
};
