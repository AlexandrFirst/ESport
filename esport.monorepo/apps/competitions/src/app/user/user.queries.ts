import { Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';

import { FindCompetitorRecordsByUserIdQuery } from '@esport.monorepo/contracts';

import { UserService } from './user.service';

@Controller()
export class UserQueries {
  constructor(private readonly userService: UserService) {}

  @RMQValidate()
  @RMQRoute(FindCompetitorRecordsByUserIdQuery.topic)
  async getCompetitorRecords({
    userId,
  }: FindCompetitorRecordsByUserIdQuery.Request): Promise<FindCompetitorRecordsByUserIdQuery.Response> {
    const user = await this.userService.findUserById(userId, {
      includeCompetitors: true,
      includeRequests: true,
    });

    return {
      userCompetitorRecords: user.competitors,
    };
  }
}
