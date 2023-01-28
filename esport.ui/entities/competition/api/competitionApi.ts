import { ICompetition } from "@entities/competition/types/competition.interface";
import { $api } from "@shared/api/next-api";
import {
  GetAllCompetitionsRequest,
  GetByIdRequest,
} from "@entities/competition/types/api";
import { ICategory } from "@entities/competition";

class CompetitionApi {
  //TODO: implement search on server
  async getAllCompetitions({
    search,
  }: GetAllCompetitionsRequest): Promise<ICompetition[]> {
    return $api.get("/competitions/all");
  }

  async getById({
    id,
    search,
  }: GetByIdRequest): Promise<{ competition: ICompetition }> {
    return $api.get(`/competitions/${id}`);
  }

  async getCategoryById(id: string): Promise<{ category: ICategory | null }> {
    return $api.get(`/competitions/categories/${id}`);
  }

  async create(competition: ICompetition): Promise<{ id: string }> {
    return $api.post("/competitions/create", competition);
  }
}

export const competitionApi = new CompetitionApi();
