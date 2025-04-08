import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
  Req,
  ParseIntPipe,
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
  public async create(
    @Req() req,
    @UploadedFile() image: Express.Multer.File,
    @Body() createGeneralReportDto: CreateGeneralReportDto,
  ) {
    if (!image) {
      throw new BadRequestException('Image file is required');
    }
    const result = await this.generalReportsService.createReport(
      req,
      createGeneralReportDto,
      image.filename,
    );

    return result;
  }

  @Get()
  public findAll() {
    return this.generalReportsService.findAll();
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
  public update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateGeneralReportDto: UpdateGeneralReportDto,
    @UploadedFile() imageFile: Express.Multer.File,
  ) {
    console.log('Uploaded filename:', imageFile?.filename);

    return this.generalReportsService.updateReport(
      req,
      +id,
      updateGeneralReportDto,
      imageFile?.filename,
    );
  }
}
