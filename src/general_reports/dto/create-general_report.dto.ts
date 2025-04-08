import { Station } from 'src/stations/station.entity';
import { GeneralReportStatus } from '../enums/general_report_status.enum';
import { IssueType } from '../enums/issue_types.enum';
import { User } from 'src/users/user.entity';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGeneralReportDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(512)
  name: string;

  @IsNotEmpty()
  @IsString()
  detail: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsEnum(IssueType, {
    message: 'Please choose issue type.',
  })
  issue_type: IssueType;

  @IsNotEmpty()
  @Type(() => Number)
  station_id: number;

  @IsOptional()
  comment?: string;
}
