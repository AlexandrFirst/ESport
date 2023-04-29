import { $api } from "@/shared/config";
import { ICreateCompetitionForm } from "../model/types/create-competitiom-form";
import { ICompetiton } from "../model/types/competiton";

import { GetCompetitionResponse } from "./types/get-competition";

class CompetitionApi {
  async createCompetition(request: ICreateCompetitionForm) {
    return $api.post("/competitions/create", request);
  }

  async getAllCompetitions() {
    return $api.get<ICompetiton[]>("/competitions/all");
  }

  async getCompetition(id: string) {
    return $api.get<GetCompetitionResponse>(`/competitions/populated/${id}`);
  }
}

export const competitionApi = new CompetitionApi();
