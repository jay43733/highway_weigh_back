import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateMainReportDto {
    @IsNotEmpty()
    @IsString()
    comment?: string;

    @IsNotEmpty()
    @IsNumber()
    general_report_id: number;
}

