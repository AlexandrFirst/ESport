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
  UserCreate,
} from '@esport.monorepo/contracts';
import { CreateCategoryDto } from '../dto/competition/create-category.dto';

import { CreateCompetitionDto } from '../dto/competition/create-competition.dto';

import { res } from '../utils/res';

@Controller('competitions/user')
export class UserController {
  constructor(private readonly rmqService: RMQService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async create(@Body() body: UserCreate.Request) {
    return res(() =>
      this.rmqService.send<UserCreate.Request, UserCreate.Response>(
        UserCreate.topic,
        body
      )
    );
  }

  // @Get(':id')
  // async getById(@Param('id') _id: string) {
  //   return res(() =>
  //     this.rmqService.send<
  //       CategoriesGetById.Request,
  //       CategoriesGetById.Response
  //     >(CategoriesGetById.topic, { _id })
  //   );
  // }
  //
  // @HttpCode(HttpStatus.CREATED)
  // @Post('create')
  // async createCategory(
  //   @Body()
  //   body: CreateCategoryDto
  // ) {
  //   return res(() =>
  //     this.rmqService.send<CategoryCreate.Request, CategoryCreate.Response>(
  //       CategoryCreate.topic,
  //       body
  //     )
  //   );
  // }
}
