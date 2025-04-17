import { Module } from '@nestjs/common';
import { MainReportsService } from './main_reports.service';
import { MainReportsController } from './main_reports.controller';

@Module({
  controllers: [MainReportsController],
  providers: [MainReportsService],
})
export class MainReportsModule {}
