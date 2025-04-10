import {
  Body,
  Injectable,
  NotFoundException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateGeneralReportDto } from './dtos/create-general_report.dto';
import { UpdateGeneralReportDto } from './dtos/update-general_report.dto';
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
    req,
    createGeneralReportDto: CreateGeneralReportDto,
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
        name: station.name,
        lat: station.lat,
        long: station.long,
      },
      who_created: req.user.userId,
    });
    return await this.reportRepo.save(newReport);
  }

  public async findAll() {
    const generalReports = await this.reportRepo.find();
    return generalReports;
  }

  public async updateReport(
    req,
    id: number,
    updateGeneralReportDto: UpdateGeneralReportDto,
    imageFile: string,
  ) {
    const checkReportExisted = await this.reportRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!checkReportExisted) {
      throw new NotFoundException('General Report not found');
    }

    const findStation = await this.stationRepo.findOne({
      where: {
        id: updateGeneralReportDto.station_id || checkReportExisted.station.id,
      },
    });

    if (!findStation) {
      throw new NotFoundException('Station not found');
    }

    if (imageFile) {
      const updateReport = {
        ...checkReportExisted,
        ...updateGeneralReportDto,
        who_edited_by_user_id: req.user.userId,
        image: imageFile,
        station: {
          id: updateGeneralReportDto.station_id || findStation.id,
          name: findStation.name,
          lat: findStation.lat,
          long: findStation.long,
        },
      };

      const result = await this.reportRepo.save(updateReport);

      return result;
    } else {
      const updateReport = {
        ...checkReportExisted,
        ...updateGeneralReportDto,
        who_edited_by_user_id: req.user.userId,
        station: {
          id: updateGeneralReportDto.station_id || findStation.id,
          name: findStation.name,
          lat: findStation.lat,
          long: findStation.long,
        },
      };

      return await this.reportRepo.save(updateReport);
    }
  }
}
