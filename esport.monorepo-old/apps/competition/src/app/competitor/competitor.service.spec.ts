import { Test, TestingModule } from '@nestjs/testing';
import { CompetitorService } from './competitor.service';

describe('CompetitorService', () => {
  let service: CompetitorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompetitorService],
    }).compile();

    service = module.get<CompetitorService>(CompetitorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
