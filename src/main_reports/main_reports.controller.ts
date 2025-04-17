import { Controller } from '@nestjs/common';
import { MainReportsService } from './main_reports.service';

@Controller('main-reports')
export class MainReportsController {
  constructor(private readonly mainReportsService: MainReportsService) {}
}
