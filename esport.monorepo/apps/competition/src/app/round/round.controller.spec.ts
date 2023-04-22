import { Test, TestingModule } from '@nestjs/testing';
import { RoundQueries } from './roundQueries';

describe('RoundController', () => {
  let controller: RoundQueries;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoundQueries],
    }).compile();

    controller = module.get<RoundQueries>(RoundQueries);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
