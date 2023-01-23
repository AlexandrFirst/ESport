import { ICompetition } from "@entities/competition/types/competition.interface";
import { $api } from "@shared/api/next-api";
import {
  GetAllCompetitionsRequest,
  GetByIdRequest,
} from "@entities/competition/types/api";

class CompetitionApi {
  //TODO: implement search on server
  getAllCompetitions({
    search,
  }: GetAllCompetitionsRequest): Promise<ICompetition[]> {
    return $api.get("/competitions/all");
  }

  getById({
    id,
    search,
  }: GetByIdRequest): Promise<{ competition: ICompetition }> {
    return $api.get(`/competitions/${id}`);
  }

  create(competition: ICompetition): Promise<{ id: string }> {
    return $api.post("/competitions/create", competition);
  }
}

export const competitionApi = new CompetitionApi();
