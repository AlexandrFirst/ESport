import { ICompetition } from "@entities/competition/types/competition.interface";
import { $api } from "@shared/api/next-api";

class CompetitionApi {
  create(competition: ICompetition) {
    return $api.post("/competitions/create", competition);
  }
}

export const competitionApi = new CompetitionApi();
