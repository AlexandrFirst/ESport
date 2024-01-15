import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';

import { RMQService } from 'nestjs-rmq';

import { res } from '../utils/res';
import {
  CompetitionCreateCommand,
  CompetitionsGetById,
  CompetitionsGetByOrganisationId,
  CompetitionsUploadDocumentsCommand,
  FindCompetitorRecordsByUserIdQuery,
} from '@esport.monorepo/contracts';
import { GetCompetitorRecordsDto } from '../dto/competition/getCompetitorRecords';
import { Competition } from '@prisma/client';

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

  //TODO: we cannot use FilesInterceptor and RMQ
  @Post('competition/upload-documents')
  @HttpCode(200)
  @UseInterceptors(FilesInterceptor('files'))
  async test(@UploadedFiles() documents: Express.Multer.File[]) {
    Logger.log(documents);
    Logger.log(CompetitionsUploadDocumentsCommand.topic);
    return res(() =>
      this.rmqService.send<
        CompetitionsUploadDocumentsCommand.Request,
        CompetitionsUploadDocumentsCommand.Response
      >(CompetitionsUploadDocumentsCommand.topic, {
        documents: [],
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

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async createCompetition(
    @Body()
    body: {
      competition: Competition;
    }
  ) {
    return res(() =>
      this.rmqService.send<
        CompetitionCreateCommand.Request,
        CompetitionCreateCommand.Response
      >(CompetitionCreateCommand.topic, body)
    );
  }

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
