import { Module } from '@nestjs/common';
import { StationsService } from './stations.service';
import { StationsController } from './stations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from './station.entity';

@Module({
  controllers: [StationsController],
  providers: [StationsService],
  exports: [StationsService],
  imports: [TypeOrmModule.forFeature([Station])],
})
export class StationsModule {}
