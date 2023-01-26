import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { RMQService } from 'nestjs-rmq';

import { CategoryUpdate, ICategory } from 'esport-lib-ts/lib/competitions';

import { res } from 'src/utility';

@Controller('competitions/categories')
export class CategoriesController {
  constructor(private readonly rmqService: RMQService) {}

  @Get(':id')
  async getById(@Param('id') _id: string) {
    return res(() =>
      this.rmqService.send('competitions.category.get-category-by-id.query', {
        _id,
      }),
    );
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  async createCompetition(
    @Body()
    category: ICategory,
  ) {
    return res(() =>
      this.rmqService.send(
        'competitions.category.create-category.command',
        category,
      ),
    );
  }

  @Patch('/update/:id')
  async updateCompetition(
    @Param('id') id: string,
    @Body()
    body: Omit<CategoryUpdate.Request, '_id'>,
  ): Promise<CategoryUpdate.Response> {
    return res(() =>
      this.rmqService.send(CategoryUpdate.topic, {
        ...body,
        _id: id,
      }),
    );
  }
}
