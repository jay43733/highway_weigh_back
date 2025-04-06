import { Injectable } from '@nestjs/common';
import { CreateGeneralReportDto } from './dto/create-general_report.dto';
import { UpdateGeneralReportDto } from './dto/update-general_report.dto';

@Injectable()
export class GeneralReportsService {
  create(createGeneralReportDto: CreateGeneralReportDto) {
    return 'This action adds a new generalReport';
  }

  findAll() {
    return `This action returns all generalReports`;
  }

  findOne(id: number) {
    return `This action returns a #${id} generalReport`;
  }

  update(id: number, updateGeneralReportDto: UpdateGeneralReportDto) {
    return `This action updates a #${id} generalReport`;
  }

  remove(id: number) {
    return `This action removes a #${id} generalReport`;
  }
}
