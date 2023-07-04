import { Controller, Get, Param } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';

import { res } from '../utils/res';
import {
  CompetitionsGetAll,
  CompetitionsGetByOrganisationId,
} from '@esport.monorepo/contracts';

@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly rmqService: RMQService) {}

  @Get('all')
  async getAll() {
    return res(() =>
      this.rmqService.send<
        CompetitionsGetAll.Request,
        CompetitionsGetAll.Response
      >(CompetitionsGetAll.topic, {})
    );
  }

  @Get('organisation/:organisationId')
  async getByOrganisationId(@Param('organisationId') organisationId: number) {
    return res(() =>
      this.rmqService.send<
        CompetitionsGetByOrganisationId.Request,
        CompetitionsGetByOrganisationId.Response
      >(CompetitionsGetByOrganisationId.topic, {
        organisationId: Number(organisationId),
      })
    );
  }
  // @Get(':id')
  // async getById(@Param('id') _id: string) {
  //   return res(() =>
  //     this.rmqService.send<
  //       CompetitionsGetById.Request,
  //       CompetitionsGetById.Response
  //     >(CompetitionsGetById.topic, { _id })
  //   );
  // }

  // @Get('populated/:id')
  // async getPopulatedById(@Param('id') _id: string) {
  //   return res(() =>
  //     this.rmqService.send<
  //       CompetitionGetPopulatedById.Request,
  //       CompetitionGetPopulatedById.Response
  //     >(CompetitionGetPopulatedById.topic, { _id })
  //   );
  // }

  // @HttpCode(HttpStatus.CREATED)
  // @Post('create')
  // async createCompetition(
  //   @Body()
  //   body: CreateCompetitionDto
  // ) {
  //   return res(() =>
  //     this.rmqService.send<
  //       CompetitionCreate.Request,
  //       CompetitionCreate.Response
  //     >(CompetitionCreate.topic, body)
  //   );
  // }

  // @HttpCode(HttpStatus.CREATED)
  // @Post('create-with-categories')
  // async createCompetitionWithCategories(
  //   @Body()
  //   body: CompetitionCreateWithCategories.Request
  // ) {
  //   return res(() =>
  //     this.rmqService.send<
  //       CompetitionCreateWithCategories.Request,
  //       CompetitionCreateWithCategories.Response
  //     >(CompetitionCreateWithCategories.topic, body)
  //   );
  // }
}
