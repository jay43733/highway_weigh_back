import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Station } from './station.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(Station)
    private readonly stationRepo: Repository<Station>,
  ) {}

  public async getStations(req) {
    const stations = await this.stationRepo.find();
    return stations;
  }
}
