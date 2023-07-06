import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';
import { CategoryEntity } from '../category/category.entity';

import { CompetitionEntity } from './competition.entity';

@Injectable()
export class CompetitionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.competition.findMany({
      include: {
        categories: {
          include: {
            rounds: {
              include: {
                fights: {
                  include: {
                    round: {
                      include: {
                        fights: {
                          include: {
                            competitors: {
                              include: {
                                user: true,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async findByOrganisationId(organisationId: number) {
    return this.prismaService.competition.findMany({
      where: {
        organisationId,
      },
      include: { organisation: true, creator: true },
    });
  }

  async create(data: CompetitionEntity) {
    const { categories, ...competition } = data;
    const categoryEntities = categories.map(
      (category) => new CategoryEntity(category)
    );
    const withCategories = !!categoryEntities.length;

    return this.prismaService.competition.create({
      data: {
        ...competition,
        categories: withCategories
          ? {
              create: categoryEntities.map((ce) => ce.transformToCreate()),
            }
          : undefined,
      },
    });
  }

  async update(data: CompetitionEntity) {
    const { categories, ...competition } = data;
    return this.prismaService.competition.update({
      where: { id: competition.id },
      data: {
        ...competition,
      },
    });
  }
}
