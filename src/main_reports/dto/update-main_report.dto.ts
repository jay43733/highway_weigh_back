import { PartialType } from '@nestjs/swagger';
import { CreateMainReportDto } from './create-main_report.dto';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { MainReportStatus } from '../enums/main_report_status.enums';

export class UpdateMainReportDto extends PartialType(CreateMainReportDto) {
    @IsNotEmpty()
    @IsString()
    comment: string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsEnum(MainReportStatus, {
        message : 'Please Select Status',
    })
    status: MainReportStatus;

    @IsOptional()
    @IsBoolean()
    // @Transform(({ value }) => value === 'true' || value === true)
    is_active?: boolean;
}
