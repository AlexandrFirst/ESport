import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';

import {
  CompetitionCreate,
  CompetitionsGetAll,
  CompetitionsGetById,
} from 'esport-lib-ts/lib/competitions';

import { res } from 'src/utility';

import { CreateCompetitionDto } from '../../dto/competitions/create-competition.dto';

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

  @Get(':id')
  async getById(@Param('id') _id: string) {
    return res(() =>
      this.rmqService.send<
        CompetitionsGetById.Request,
        CompetitionsGetById.Response
      >(CompetitionsGetById.topic, { _id }),
    );
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async createCompetition(
    @Body()
    body: CreateCompetitionDto,
  ) {
    return res(() =>
      this.rmqService.send<
        CompetitionCreate.Request,
        CompetitionCreate.Response
      >(CompetitionCreate.topic, body),
    );
  }
}
