import {Controller, Get} from '@nestjs/common';

// @Controller('competitions')
@Controller()
export class CompetitionsController {
  @Get('hello')
  async getCompetitions() {
    return 'Hello World';
  }
}
