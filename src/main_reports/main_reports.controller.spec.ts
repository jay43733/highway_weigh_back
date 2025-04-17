import { Test, TestingModule } from '@nestjs/testing';
import { MainReportsController } from './main_reports.controller';
import { MainReportsService } from './main_reports.service';

describe('MainReportsController', () => {
  let controller: MainReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainReportsController],
      providers: [MainReportsService],
    }).compile();

    controller = module.get<MainReportsController>(MainReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
