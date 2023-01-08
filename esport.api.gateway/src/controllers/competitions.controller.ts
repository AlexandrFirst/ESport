import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';

import {
  CompetitionsCreateCompetition,
  CompetitionsPublicInfo,
} from 'esport-lib-ts/lib/competitions';
import { CreateCompetitionDto } from '../dto/competitions/create-competition.dto';

@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly rmqService: RMQService) {}

  @Get('all')
  async getAllCompetitions() {
    try {
      return await this.rmqService.send<
        CompetitionsPublicInfo.Request,
        CompetitionsPublicInfo.Response
      >(CompetitionsPublicInfo.topic, {
        id: 'some_id',
      });
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, error.code ?? 500);
    }
  }

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
        CompetitionsCreateCompetition.Request,
        CompetitionsCreateCompetition.Response
      >(CompetitionsCreateCompetition.topic, {
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
