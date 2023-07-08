import { ICompetitor } from "../../model/types/competitor";
import { ICompetition } from "../../model/types/competiton";

export interface CompetitionRequest {
  id: number;
  competitor?: ICompetitor;
  competitorId: number;
  competition?: ICompetition;
  competitionId: number;
  createdAt: string;
  updatedAt: string;
  isAccepted: boolean;
}
