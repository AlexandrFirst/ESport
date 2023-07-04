import { Api } from "@/shared/config";
import { ApiContext } from "@/shared/types";

import { ICreateCompetitionForm } from "../model/types/create-competitiom-form";
import { ICompetiton } from "../model/types/competiton";

import { GetCompetitionResponse } from "./types/get-competition";
import { ICompetitionWithOrganisationAndCreator } from "./types/get-competitions-by-organisation-id";
import { IOrganisation } from "@/entities/organisation";

export const CompetitionApi = (ctx?: ApiContext) => {
  const instance = Api({ ctx, baseURL: "http://localhost:3002/api/v1" });

  return {
    async createCompetition(request: ICreateCompetitionForm) {
      return instance.post("/competitions/create", request);
    },

    async getAllCompetitions() {
      return instance.get<ICompetiton[]>("/competitions/all");
    },

    async getCompetition(id: string) {
      return instance.get<GetCompetitionResponse>(
        `/competitions/populated/${id}`
      );
    },

    async getCompetitionsByOrganisationId(id: number) {
      return instance.get<{
        competitions: ICompetitionWithOrganisationAndCreator[];
        organisation: { id: number; name: string };
      }>(`/competitions/organisation/${id}`);
    },
  };
};
