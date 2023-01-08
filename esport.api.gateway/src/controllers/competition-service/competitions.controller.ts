import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';

import { CompetitionCreate } from 'esport-lib-ts/lib/competition';
import { CreateCompetitionDto } from '../../dto/competitions/create-competition.dto';

@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly rmqService: RMQService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  async createCompetition(
    @Body()
    { dateEnd, dateStart, categories, ...rest }: CreateCompetitionDto,
  ) {
    try {
      const dateStartFormatted = new Date(dateStart);
      const dateEndFomtatted = dateEnd ? new Date(dateEnd) : undefined;
      return await this.rmqService.send<
        CompetitionCreate.Request,
        CompetitionCreate.Response
      >(CompetitionCreate.topic, {
        ...rest,
        dateStart: dateStartFormatted,
        dateEnd: dateEndFomtatted,
        categories: categories ?? [],
      });
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, error.code ?? 500);
    }
  }
}
