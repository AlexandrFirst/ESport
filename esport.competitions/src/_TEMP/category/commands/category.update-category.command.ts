import { IsArray, IsOptional, IsString } from 'class-validator';
import { IFight } from 'esport-lib-ts/lib/competitions';

export namespace CategoryUpdate {
  export const topic = 'competitions.category.update-category.command';

  export class Request {
    @IsString()
    _id: string;

    @IsString()
    title: string;

    @IsArray()
    @IsOptional()
    fights: Partial<IFight>[];
  }

  export class Response {
    message: string;
  }
}
