import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GeneralReportsService } from './general_reports.service';
import { CreateGeneralReportDto } from './dto/create-general_report.dto';
import { UpdateGeneralReportDto } from './dto/update-general_report.dto';

@Controller('general-reports')
export class GeneralReportsController {
  constructor(private readonly generalReportsService: GeneralReportsService) {}

  @Post()
  create(@Body() createGeneralReportDto: CreateGeneralReportDto) {
    return this.generalReportsService.create(createGeneralReportDto);
  }

  @Get()
  findAll() {
    return this.generalReportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generalReportsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGeneralReportDto: UpdateGeneralReportDto) {
    return this.generalReportsService.update(+id, updateGeneralReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generalReportsService.remove(+id);
  }
}
