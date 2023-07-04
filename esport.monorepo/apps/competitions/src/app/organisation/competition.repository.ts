import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../database/prisma.service';

@Injectable()
export class OrganisationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(
    id: number,
    include?: Prisma.OrganisationInclude,
    where?: Prisma.OrganisationWhereInput
  ) {
    return this.prismaService.organisation.findUnique({
      where: {
        ...where,
        id,
      },
      include,
    });
  }
}
