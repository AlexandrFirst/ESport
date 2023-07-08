import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';

import { CreateRequestByExistingUserCommand } from '@esport.monorepo/contracts';

import { res } from '../utils/res';

@Controller('competitions/request')
export class RequestController {
  constructor(private readonly rmqService: RMQService) {}

  @UsePipes(ValidationPipe)
  @Post('createRequestWithExistingCompetitor')
  async createRequestWithExistingCompetitor(
    @Body() data: CreateRequestByExistingUserCommand.Request
  ) {
    return res(() =>
      this.rmqService.send<
        CreateRequestByExistingUserCommand.Request,
        CreateRequestByExistingUserCommand.Response
      >(CreateRequestByExistingUserCommand.topic, data)
    );
  }
}
