import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { RMQService } from "nestjs-rmq";

import { CompetitionCreate } from "esport-lib-ts/lib/competition";
import { CreateCompetitionDto } from"../../dto/competitions/create-competition.dto"';
import { res } from"src/utility"';

@Controller("competitions")
export class CompetitionsController {
  constructor(private readonly rmqService: RMQService) {
  }

  @Get("all")
  async getAll() {
    return res(() =>
      this.rmqService.send<any, any>(
        "competitions.competition.get-all-competitions.query",
        {}
      )
    );
  }

  @HttpCode(HttpStatus.CREATED)
  @Post("create")
  async createCompetition(
    @Body()
      { categories, ...rest }: CreateCompetitionDto
  ) {
    return res(() =>
      this.rmqService.send<
        //TODO: fix CompetitionCreate.Request category type to string[]
        any,
        CompetitionCreate.Response
      >(CompetitionCreate.topic, {
        ...rest,
        categories: categories ?? []
      })
    );
  }
}
