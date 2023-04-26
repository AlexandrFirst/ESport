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
  CompetitionCreateWithCategories,
  CompetitionsGetAll,
  CompetitionsGetById,
  CompetitionGetPopulatedById,
} from '@esport.monorepo/contracts';

import { CreateCompetitionDto } from '../dto/competition/create-competition.dto';

import { res } from '../utils/res';

@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly rmqService: RMQService) {}

  @Get('all')
  async getAll() {
    return res(() =>
      this.rmqService.send<unknown, CompetitionsGetAll.Response>(
        CompetitionsGetAll.topic,
        {}
      )
    );
  }

  @Get(':id')
  async getById(@Param('id') _id: string) {
    return res(() =>
      this.rmqService.send<
        CompetitionsGetById.Request,
        CompetitionsGetById.Response
      >(CompetitionsGetById.topic, { _id })
    );
  }

  @Get('populated/:id')
  async getPopulatedById(@Param('id') _id: string) {
    return res(() =>
      this.rmqService.send<
        CompetitionGetPopulatedById.Request,
        CompetitionGetPopulatedById.Response
      >(CompetitionGetPopulatedById.topic, { _id })
    );
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async createCompetition(
    @Body()
    body: CreateCompetitionDto
  ) {
    return res(() =>
      this.rmqService.send<
        CompetitionCreate.Request,
        CompetitionCreate.Response
      >(CompetitionCreate.topic, body)
    );
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('create-with-categories')
  async createCompetitionWithCategories(
    @Body()
    body: CompetitionCreateWithCategories.Request
  ) {
    return res(() =>
      this.rmqService.send<
        CompetitionCreateWithCategories.Request,
        CompetitionCreateWithCategories.Response
      >(CompetitionCreateWithCategories.topic, body)
    );
  }
}
