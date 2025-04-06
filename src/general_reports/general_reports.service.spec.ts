import { Test, TestingModule } from '@nestjs/testing';
import { GeneralReportsService } from './general_reports.service';

describe('GeneralReportsService', () => {
  let service: GeneralReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralReportsService],
    }).compile();

    service = module.get<GeneralReportsService>(GeneralReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
