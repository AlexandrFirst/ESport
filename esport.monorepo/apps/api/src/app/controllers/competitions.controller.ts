import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';

import { res } from '../utils/res';
import {
  CompetitionsGetById,
  CompetitionsGetByOrganisationId,
  FindCompetitorRecordsByUserIdQuery,
} from '@esport.monorepo/contracts';
import { GetCompetitorRecordsDto } from '../dto/competition/getCompetitorRecords';

@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly rmqService: RMQService) {}

  @Get('organisation/:organisationId')
  async getByOrganisationId(
    @Param('organisationId') organisationId: number,
    @Query('includeClosedRegistration') includeClosedRegistration: string
  ) {
    return res(() =>
      this.rmqService.send<
        CompetitionsGetByOrganisationId.Request,
        CompetitionsGetByOrganisationId.Response
      >(CompetitionsGetByOrganisationId.topic, {
        organisationId: Number(organisationId),
        includeClosedRegistration: includeClosedRegistration === 'true',
      })
    );
  }

  @UsePipes(ValidationPipe)
  @HttpCode(200)
  @Post('getCompetitorRecords')
  async getCompetitorRecords(@Body() { userId }: GetCompetitorRecordsDto) {
    return res(() =>
      this.rmqService.send<
        FindCompetitorRecordsByUserIdQuery.Request,
        FindCompetitorRecordsByUserIdQuery.Response
      >(FindCompetitorRecordsByUserIdQuery.topic, {
        userId,
      })
    );
  }

  @Get('competition/:id')
  async getById(
    @Param('id') id: string,
    @Query('includeRequests') includeRequests?: string
  ) {
    return res(() =>
      this.rmqService.send<
        CompetitionsGetById.Request,
        CompetitionsGetById.Response
      >(CompetitionsGetById.topic, {
        competitionId: Number(id),
        includeRequests: includeRequests === 'true',
      })
    );
  }

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
