import { Test, TestingModule } from '@nestjs/testing';
import { GeneralReportsController } from './general_reports.controller';
import { GeneralReportsService } from './general_reports.service';

describe('GeneralReportsController', () => {
  let controller: GeneralReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneralReportsController],
      providers: [GeneralReportsService],
    }).compile();

    controller = module.get<GeneralReportsController>(GeneralReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
