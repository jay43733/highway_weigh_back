import { GeneralReport } from 'src/general_reports/general_report.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Station {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('nvarchar', {
    length: 96,
    nullable: false,
  })
  name: string;

  @Column('decimal', { precision: 11, scale: 7, nullable: false, unique: true })
  lat: number;

  @Column('decimal', { precision: 11, scale: 7, nullable: false, unique: true })
  long: number;

  @OneToMany(() => GeneralReport, (report) => report.station)
  reports: GeneralReport[];
}
