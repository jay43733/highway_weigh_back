import { PartialType } from '@nestjs/swagger';
import { CreateGeneralReportDto } from './create-general_report.dto';

export class UpdateGeneralReportDto extends PartialType(CreateGeneralReportDto) {}
