import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../database/prisma.service';
import isBefore from 'date-fns/isBefore';

@Injectable()
export class OrganisationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(
    id: number,
    params?: {
      include?: Prisma.OrganisationInclude;
      where?: Prisma.OrganisationWhereInput;
    }
  ) {
    const { include, where } = params || {};
    include.competitions;
    const prismaExtend = this.prismaService.$extends({
      result: {
        competition: {
          isRegistrationOpen: {
            needs: { registrationCloseDate: true },
            compute(data) {
              return isBefore(new Date(), data.registrationCloseDate);
            },
          },
        },
      },
    });
    return prismaExtend.organisation.findUnique({
      where: {
        ...where,
        id,
      },
      include,
    });
  }
}
