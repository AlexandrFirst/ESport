import { IsNumber, IsOptional } from 'class-validator';

export class GetCompetitorRecordsDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  @IsOptional()
  competitionId?: number;
}
