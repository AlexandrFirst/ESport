import { IsArray, IsOptional, IsString } from 'class-validator';
import { IFight } from 'esport-lib-ts/lib/competition';

export namespace CategoryUpdate {
  export const topic = 'category.update-category.command';

  export class Request {
    @IsString()
    id: string;

    @IsString()
    title: string;

    @IsArray()
    @IsOptional()
    fights: Omit<IFight, '_id' | 'winnerId'>[];
  }

  export class Response {
    message: string;
  }
}
