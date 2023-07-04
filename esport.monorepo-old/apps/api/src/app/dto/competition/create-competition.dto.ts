import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateCompetitionDto {
  @IsString()
  title: string;

  @IsNumber()
  organizationId: number;

  @IsString()
  dateStart: string;

  @IsArray()
  @IsString({ each: true })
  categoryIds: string[];
}
