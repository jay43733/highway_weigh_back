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
} from '@nestjs/common';
import { GeneralReportsService } from './general_reports.service';
import { CreateGeneralReportDto } from './dto/create-general_report.dto';
import { UpdateGeneralReportDto } from './dto/update-general_report.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auths/jwt-auth.guard';

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
  findAll(@Req() req) {
    return this.generalReportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generalReportsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGeneralReportDto: UpdateGeneralReportDto,
  ) {
    return this.generalReportsService.update(+id, updateGeneralReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generalReportsService.remove(+id);
  }
}
