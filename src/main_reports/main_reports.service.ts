import { Body, Injectable, NotFoundException, Param, Query } from '@nestjs/common';
import { CreateMainReportDto } from './dto/create-main_report.dto';
import { UpdateMainReportDto } from './dto/update-main_report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GeneralReport } from 'src/general_reports/general_report.entity';
import { MainReport } from './entities/main_report.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MainReportsService {
  constructor(
    @InjectRepository(MainReport)
    private readonly mainReportRepo: Repository<MainReport>,

    @InjectRepository(GeneralReport)
    private readonly generalReportRepo: Repository<GeneralReport>,
  ) {}

  public async createFromStatus2() {
  const generalReports = await this.generalReportRepo.find({
    where: { status: 2 },
  });

  if (!generalReports.length) {
    throw new NotFoundException('No GeneralReport with status = 2');
  }

  const results: MainReport[] = [];

  for (const general of generalReports) {
    const exists = await this.mainReportRepo.findOne({
      where: { general_report: { id: general.id } },
    });

    if (!exists) {
      const main = this.mainReportRepo.create({
        general_report: general,
      });

      const saved = await this.mainReportRepo.save(main);
      results.push(saved);
    }
  }

  return results;
}
// ----

  // public async createMain(
  //   @Body() createMainReportDto: CreateMainReportDto,
  // ) {
  //   const newMainReport  = this.mainReportRepo.create({
  //     comment: createMainReportDto.comment
  //   });
  //   return await this.mainReportRepo.save(newMainReport);
  // }
  
  public async findAll() {
    const mainReport = await this.mainReportRepo.find();
    return mainReport;
  }

  public async findOne(id: number | string): Promise<MainReport | null> {
    const report = await this.mainReportRepo.findOne({
      where: { id: Number(id) },
      relations: ['general_report'],
    });

    return report || null;
  }

  async update(id: number, dto: UpdateMainReportDto) {
    return await this.mainReportRepo.update(id, dto);
  }

  remove(id: number) {
    return `This action removes a #${id} mainReport`;
  }
}
