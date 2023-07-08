import { CompetitorType } from "@/entities/competition";

export interface CreateCompetitionRequestForm {
  level: number;
  weight: number;
  height: number;
  competitorType: {
    value: CompetitorType;
    name: string;
  };
}
