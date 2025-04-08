import { PartialType } from '@nestjs/swagger';
import { CreateGeneralReportDto } from './create-general_report.dto';
import { IssueType } from '../enums/issue_types.enum';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateGeneralReportDto extends PartialType(
  CreateGeneralReportDto,
) {
  @IsOptional()
  @IsString()
  @MaxLength(512)
  name?: string;

  @IsOptional()
  detail?: string;

  @IsOptional()
  @Type(() => Number)
  @IsEnum(IssueType, {
    message: 'Please choose issue type.',
  })
  issue_type?: IssueType;

  @IsOptional()
  @Type(() => Number)
  status: number;

  @IsOptional()
  @Type(() => Number)
  station_id?: number;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  is_active?: boolean;
}
