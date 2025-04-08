import {
  Body,
  Injectable,
  NotFoundException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateGeneralReportDto } from './dto/create-general_report.dto';
import { UpdateGeneralReportDto } from './dto/update-general_report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GeneralReport } from './general_report.entity';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from 'src/auths/jwt-auth.guard';
import { Station } from 'src/stations/station.entity';

@Injectable()
export class GeneralReportsService {
  constructor(
    @InjectRepository(GeneralReport)
    private readonly reportRepo: Repository<GeneralReport>,

    @InjectRepository(Station)
    private readonly stationRepo: Repository<Station>,
  ) {}

  public async createReport(
    @Req() req,
    @Body() createGeneralReportDto: CreateGeneralReportDto,
    imageFile: string,
  ) {
    const station = await this.stationRepo.findOne({
      where: {
        id: createGeneralReportDto.station_id,
      },
    });

    if (!station) {
      throw new NotFoundException('Station not found');
    }

    const newReport = this.reportRepo.create({
      name: createGeneralReportDto.name,
      detail: createGeneralReportDto.detail,
      issue_type: createGeneralReportDto.issue_type,
      image: imageFile,
      station: {
        id: createGeneralReportDto.station_id,
      },
      who_created: req.user.userId,
    });
    return await this.reportRepo.save(newReport);
  }

  public async findAll() {
    const generalReports = await this.reportRepo.find();
    return generalReports;
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
