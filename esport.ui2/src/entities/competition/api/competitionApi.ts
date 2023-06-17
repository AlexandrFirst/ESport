import { Api } from "@/shared/config";
import { ApiContext } from "@/shared/types";

import { ICreateCompetitionForm } from "../model/types/create-competitiom-form";
import { ICompetiton } from "../model/types/competiton";

import { GetCompetitionResponse } from "./types/get-competition";

export const CompetitionApi = async (ctx?: ApiContext) => {
  const instance = await Api({ ctx, baseURL: "https://localhost:3001/api/v1" });

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
  };
};
