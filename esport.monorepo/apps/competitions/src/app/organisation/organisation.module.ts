import { Module } from '@nestjs/common';

import { PrismaModule } from '../database/prisma.module';
import { OrganisationService } from './organisation.service';
import { OrganisationRepository } from './competition.repository';
import { OrganisationQueries } from './organisation.queries';

@Module({
  imports: [PrismaModule],
  controllers: [OrganisationQueries],
  providers: [OrganisationService, OrganisationRepository],
  exports: [OrganisationService],
})
export class OrganisationModule {}
