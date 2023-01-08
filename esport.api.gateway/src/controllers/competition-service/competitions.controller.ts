import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';

import { CompetitionCreate } from 'esport-lib-ts/lib';

import { res } from 'src/utility';

import { CreateCompetitionDto } from '../../dto/competitions/create-competition.dto';
import { CompetitionsGetAll } from 'esport-lib-ts/lib/competitions/contracts/commands/competition.get-all-competitions';

@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly rmqService: RMQService) {}

  @Get('all')
  async getAll() {
    return res(() =>
      this.rmqService.send<unknown, CompetitionsGetAll.Response>(
        CompetitionsGetAll.topic,
        {},
      ),
    );
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async createCompetition(
    @Body()
    { categories, ...rest }: CreateCompetitionDto,
  ) {
    return res(() =>
      this.rmqService.send<
        CompetitionCreate.Request,
        CompetitionCreate.Response
      >(CompetitionCreate.topic, {
        ...rest,
        categories: categories ?? [],
      }),
    );
  }
}
