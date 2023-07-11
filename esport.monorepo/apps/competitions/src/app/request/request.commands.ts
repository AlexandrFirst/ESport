import { Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import {
  CreateRequestByExistingUserCommand,
  DeleteRequestByIdCommand,
  NotFoundError,
} from '@esport.monorepo/contracts';

import { UserService } from '../user/user.service';
import { CompetitorService } from '../competitor/competitor.service';

import { RequestService } from './request.service';

@Controller()
export class RequestCommands {
  constructor(
    private readonly requestService: RequestService,
    private readonly competitorService: CompetitorService,
    private readonly userService: UserService
  ) {}

  @RMQRoute(CreateRequestByExistingUserCommand.topic)
  @RMQValidate()
  async createRequestWithExistingCompetitor({
    competitorType,
    competitionId,
    level,
    weight,
    height,
    userId,
  }: CreateRequestByExistingUserCommand.Request): Promise<CreateRequestByExistingUserCommand.Response> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundError(`User with id: ${userId} not found`);
    }

    const { id } = await this.competitorService.createCompetitorByUser({
      competitorType,
      level,
      weight,
      height,
      name: user.name,
      userId,
    });
    return this.requestService.createRequestWithExistingCompetitor({
      competitorId: id,
      competitionId,
    });
  }

  @RMQValidate()
  @RMQRoute(DeleteRequestByIdCommand.topic)
  async deleteRequest({ id }: DeleteRequestByIdCommand.Request) {
    return this.requestService.deleteRequestById(id);
  }
}
