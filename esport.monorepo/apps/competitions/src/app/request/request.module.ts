import { Module } from '@nestjs/common';

import { PrismaModule } from '../database/prisma.module';
import { CompetitorModule } from '../competitor/competitor.module';
import { UserModule } from '../user/user.module';

import { RequestCommands } from './request.commands';
import { RequestService } from './request.service';

@Module({
  imports: [PrismaModule, CompetitorModule, UserModule],
  controllers: [RequestCommands],
  providers: [RequestService],
  exports: [],
})
export class RequestModule {}
