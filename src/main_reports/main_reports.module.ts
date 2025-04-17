import { Module } from '@nestjs/common';
import { MainReportsService } from './main_reports.service';
import { MainReportsController } from './main_reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainReport } from './entities/main_report.entity';
import { GeneralReport } from 'src/general_reports/general_report.entity';
import { GeneralReportsModule } from 'src/general_reports/general_reports.module';

@Module({
  controllers: [MainReportsController],
  providers: [MainReportsService],
  exports: [MainReportsService],
  imports: [TypeOrmModule.forFeature([MainReport, GeneralReport]), GeneralReportsModule]

})
export class MainReportsModule {}
