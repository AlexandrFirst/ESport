import { Controller } from "@nestjs/common";
import { RMQRoute } from "nestjs-rmq";

import { CompetitionService } from "./competition.service";
import { CompetitionEntity } from "./competition.entity";

@Controller()
export class CompetitionCommands {
    constructor(private readonly competitionService: CompetitionService) {}

  @RMQRoute('competitions.create')
  async create(data: CompetitionEntity) {
    return this.competitionService.create(data);
  }
}