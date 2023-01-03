import {Controller, Get} from '@nestjs/common';
import {RMQService} from 'nestjs-rmq';

import {CompetitionsPublicInfo} from 'esport-lib-ts/lib/competitions';

// @Controller('competitions')
@Controller()
export class CompetitionsController {
  constructor(private readonly rmqService: RMQService) {}

  @Get('hello')
  async getCompetitions() {
    return 'Hello World';
  }

  @Get('all')
  async getAllCompetitions() {
    try {
      return this.rmqService.send<
        CompetitionsPublicInfo.Request,
        CompetitionsPublicInfo.Response
      >(CompetitionsPublicInfo.topic, {
        id: 'some_id',
      });
    } catch (error) {
      console.log(error);
    }
  }
}
