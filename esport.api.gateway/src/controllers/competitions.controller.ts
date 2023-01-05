import { Controller, Get, HttpException, Logger } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';

import { CompetitionsPublicInfo } from 'esport-lib-ts/lib/competitions';

// @Controller('competitions')
@Controller()
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
}
