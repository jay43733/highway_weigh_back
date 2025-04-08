import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { StationsService } from './stations.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('stations')
@UseGuards(AuthGuard('jwt'))
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Get()
  public findAll(@Req() req) {
    return this.stationsService.getStations(req);
  }
}
