import { $api } from "@/shared/config";
import { ICreateCompetitionForm } from "../model/types/create-competitiom-form";

class CompetitionApi {
  async createCompetition(request: ICreateCompetitionForm) {
    return $api.post("/api/competitions/create", request);
  }
}

export const competitionApi = new CompetitionApi();
