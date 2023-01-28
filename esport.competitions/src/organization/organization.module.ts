import { Module } from '@nestjs/common';
import { OrganizationEvents } from './organization.events';
import { OrganizationService } from './organization.service';

@Module({
  controllers: [OrganizationEvents],
  providers: [OrganizationService],
})
export class OrganizationModule {}
