import { Module } from '@nestjs/common';
import { GeneralReportsService } from './general_reports.service';
import { GeneralReportsController } from './general_reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralReport } from './general_report.entity';
import { Station } from 'src/stations/station.entity';

@Module({
  controllers: [GeneralReportsController],
  providers: [GeneralReportsService],
  exports: [GeneralReportsService],
  imports: [TypeOrmModule.forFeature([GeneralReport, Station])],
})
export class GeneralReportsModule {}
