import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadRequestException, Req } from '@nestjs/common';
import { MainReportsService } from './main_reports.service';
import { CreateMainReportDto } from './dto/create-main_report.dto';
import { UpdateMainReportDto } from './dto/update-main_report.dto';
import { GeneralReportsService } from 'src/general_reports/general_reports.service';

@Controller('main_reports')
export class MainReportsController {
  constructor(
    private readonly mainReportsService: MainReportsService,
    private readonly generalReportService: GeneralReportsService,
  ) {}

  @Post('auto-create')
  createFromStatus3() {
  return this.mainReportsService.createFromStatus2();
}

  // @Post()
  // public async create(
  //   @Body() createMainReportDto: CreateMainReportDto,
  // ) {
  //   const result = await this.mainReportsService.createMain(
  //     createMainReportDto
  //   );
  //   return result;
  // }

  @Get()
  findAll() {
    return this.mainReportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mainReportsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateMainReportDto: UpdateMainReportDto) {
    return this.mainReportsService.update(+id, updateMainReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mainReportsService.remove(+id);
  }
}
