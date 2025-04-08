import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationsModule } from './stations/stations.module';
import { GeneralReportsModule } from './general_reports/general_reports.module';
import { AuthsModule } from './auths/auths.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.entity';
import { Station } from './stations/station.entity';
import { GeneralReport } from './general_reports/general_report.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'mssql',
        autoLoadEntities: true,
        synchronize: true,
        // dropSchema: true,
        port: 26433,
        username: 'nwlproduction',
        password: 'Nwl!2563789!',
        host: '85.204.247.82',
        database: 'Highway_weigh',
        options: {
          encrypt: false,
        },
        entities: [User, Station, GeneralReport],
      }),
    }),
    StationsModule,
    GeneralReportsModule,
    AuthsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
