import { IRound } from '@esport.monorepo/interfaces';
import { IsArray, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  title: string;

  @IsArray()
  rounds: IRound[];
}
