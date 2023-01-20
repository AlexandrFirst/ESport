import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { RMQService } from 'nestjs-rmq';

import { FightCreate } from 'esport-lib-ts/lib/competitions';

import { res } from 'src/utility';

@Controller('competitions/fights')
export class FightsController {
  constructor(private readonly rmqService: RMQService) {}

  // @Get(':id')
  // async getById(@Param('id') _id: string) {
  //   return res(() =>
  //     this.rmqService.send('competitions.category.get-category-by-id.query', {
  //       _id,
  //     }),
  //   );
  // }

  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  async createCompetition(
    @Body()
    body: FightCreate.Request,
  ) {
    return res(() =>
      this.rmqService.send<FightCreate.Request, FightCreate.Response>(
        FightCreate.topic,
        body,
      ),
    );
  }

  // @Patch('/update/:id')
  // async updateCompetition(
  //   @Param('id') id: string,
  //   @Body()
  //   body: Omit<CategoryUpdate.Request, '_id'>,
  // ): Promise<CategoryUpdate.Response> {
  //   return res(() =>
  //     this.rmqService.send(CategoryUpdate.topic, {
  //       ...body,
  //       _id: id,
  //     }),
  //   );
  // }
}
