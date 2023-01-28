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

import {
  CategoriesGetById,
  CategoryCreate,
  CategoryUpdate,
  ICategory,
} from 'esport-lib-ts/lib/competitions';

import { res } from 'src/utility';

@Controller('competitions/categories')
export class CategoriesController {
  constructor(private readonly rmqService: RMQService) {}

  @Get(':id')
  async getById(@Param('id') _id: string) {
    return res(() =>
      this.rmqService.send<
        CategoriesGetById.Request,
        CategoriesGetById.Response
      >(CategoriesGetById.topic, {
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
      this.rmqService.send<CategoryCreate.Request, CategoryCreate.Response>(
        CategoryCreate.topic,
        category,
      ),
    );
  }

  @Patch('/update/:id')
  async updateCompetition(
    @Param('id') _id: string,
    @Body()
    body: Omit<CategoryUpdate.Request, '_id'>,
  ): Promise<CategoryUpdate.Response> {
    return res(() =>
      this.rmqService.send(CategoryUpdate.topic, {
        ...body,
        _id,
      }),
    );
  }
}
