import { Module } from "@nestjs/common";

import { PrismaModule } from "../database/prisma.module";

import { CategoryService } from "./category.service";

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CompetitionModule {}
