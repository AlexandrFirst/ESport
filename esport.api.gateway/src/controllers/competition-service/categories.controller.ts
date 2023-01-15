import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { RMQService } from 'nestjs-rmq';

import { ICategory } from 'esport-lib-ts/lib/competitions';

import { res } from 'src/utility';

@Controller('competitions/categories')
export class CategoriesController {
  constructor(private readonly rmqService: RMQService) {}

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
    body: any,
  ) {
    return res(() =>
      this.rmqService.send('competitions.category.update-category.command', {
        id,
        ...body,
      }),
    );
  }
}
