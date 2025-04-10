import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IssueType } from './enums/issue_types.enum';
import { GeneralReportStatus } from './enums/general_report_status.enum';
import { User } from 'src/users/user.entity';
import { Station } from 'src/stations/station.entity';

@Entity()
export class GeneralReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('nvarchar', {
    length: 512,
    nullable: false,
  })
  name: string;

  @Column('nvarchar', {
    length: 'max',
    nullable: false,
  })
  detail: string;

  @Column('nvarchar', { nullable: true, length: 255 })
  image: string;

  @Column('int', { nullable: false })
  issue_type: IssueType;

  @Column('text', { nullable: true })
  comment?: string;

  @Column('bit', { nullable: false, default: true })
  is_active: boolean;

  @Column('int', {
    default: GeneralReportStatus.PENDING,
    nullable: false,
  })
  status: GeneralReportStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  edited_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'who_edited_by_user_id' })
  who_edited?: number;

  @Column('int', { nullable: true })
  who_edited_by_user_id?: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'who_created_by_user_id' })
  who_created: User;

  @ManyToOne(() => Station, { eager: true })
  @JoinColumn({ name: 'station_id' })
  station: Station;
}
