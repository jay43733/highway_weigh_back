import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { GeneralReportsService } from './general_reports.service';
import { CreateGeneralReportDto } from './dtos/create-general_report.dto';
import { UpdateGeneralReportDto } from './dtos/update-general_report.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('general_reports')
@UseGuards(AuthGuard('jwt'))
export class GeneralReportsController {
  constructor(private readonly generalReportsService: GeneralReportsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './general_reports/uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/^image\/(jpg|jpeg|png)$/)) {
          return callback(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  public async create(
    @Req() req,
    @UploadedFile() image: Express.Multer.File,
    @Body() createGeneralReportDto: CreateGeneralReportDto,
  ) {
    if (!image) {
      throw new BadRequestException('Image file is required');
    }
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const newReport = await this.generalReportsService.createReport(
      req,
      createGeneralReportDto,
      image.filename,
    );

    const result = {
      ...newReport,
      imageUrl: `${baseUrl}/uploads/${newReport.image}`,
    };

    return result;
  }

  @Get()
  public async findAll(@Req() req) {
    const generalReports = await this.generalReportsService.findAll();
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    return generalReports.map((item) => ({
      id: item.id,
      name: item.name,
      detail: item.detail,
      image: item.image,
      imageUrl: `${baseUrl}/uploads/${item.image}`,
      issue_type: item.issue_type,
      comment: item.comment,
      is_active: item.is_active,
      status: item.status,
      created_at: item.created_at,
      edited_at: item.edited_at,
      who_edited_by_user_id: item.who_edited_by_user_id,
      who_created: item.who_created
        ? {
            id: item.who_created.id,
            role: item.who_created.role,
          }
        : null,
      station: item.station
        ? {
            id: item.station.id,
            name: item.station.name,
            lat: item.station.lat,
            long: item.station.long,
          }
        : null,
    }));
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './general_reports/uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  public async update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateGeneralReportDto: UpdateGeneralReportDto,
    @UploadedFile() imageFile: Express.Multer.File,
  ) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    const updateReport = await this.generalReportsService.updateReport(
      req,
      +id,
      updateGeneralReportDto,
      imageFile?.filename,
    );

    const result = {
      ...updateReport,
      imageUrl: updateReport.image
        ? `${baseUrl}/uploads/${updateReport.image}`
        : null,
      who_created: updateReport.who_created
        ? {
            id: updateReport.who_created.id,
            role: updateReport.who_created.role,
          }
        : null,
    };

    return result;
  }
}
