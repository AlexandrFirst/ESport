import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';

import {
  CategoriesGetAll,
  CategoriesGetById,
  CategoryCreate,
  CompetitionCreate,
} from '@esport.monorepo/contracts';
import { CreateCategoryDto } from '../dto/competition/create-category.dto';

import { CreateCompetitionDto } from '../dto/competition/create-competition.dto';

import { res } from '../utils/res';

@Controller('competitions/categories')
export class CategoriesController {
  constructor(private readonly rmqService: RMQService) {}

  @Get('all')
  async getAll() {
    return res(() =>
      this.rmqService.send<unknown, CategoriesGetAll.Response>(
        CategoriesGetAll.topic,
        {}
      )
    );
  }

  @Get(':id')
  async getById(@Param('id') _id: string) {
    return res(() =>
      this.rmqService.send<
        CategoriesGetById.Request,
        CategoriesGetById.Response
      >(CategoriesGetById.topic, { _id })
    );
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async createCategory(
    @Body()
    body: CreateCategoryDto
  ) {
    return res(() =>
      this.rmqService.send<CategoryCreate.Request, CategoryCreate.Response>(
        CategoryCreate.topic,
        body
      )
    );
  }
}
