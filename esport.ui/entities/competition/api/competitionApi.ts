import { ICompetition } from "@entities/competition/types/competition.interface";
import { $api } from "@shared/api/next-api";
import { GetByIdRequest } from "@entities/competition/types/api";

class CompetitionApi {
  create(competition: ICompetition): Promise<{ id: string }> {
    return $api.post("/competitions/create", competition);
  }

  //TODO: implement search on server
  getById({
    id,
    search,
  }: GetByIdRequest): Promise<{ competition: ICompetition }> {
    return $api.get(`/competitions/${id}`);
  }
}

export const competitionApi = new CompetitionApi();
