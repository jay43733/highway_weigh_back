import { Test, TestingModule } from '@nestjs/testing';
import { MainReportsService } from './main_reports.service';

describe('MainReportsService', () => {
  let service: MainReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MainReportsService],
    }).compile();

    service = module.get<MainReportsService>(MainReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
