import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ICompetition } from 'esport-lib-ts/lib';

export class CreateCompetitionDto {
  @IsString()
  title: string;

  @IsString()
  dateStart: string; //must be in date format

  @IsOptional()
  @IsString()
  dateEnd?: string; //must be in date format

  @IsNumber()
  organizationId: number;

  @IsOptional()
  categories?: ICompetition['categories'];
}
