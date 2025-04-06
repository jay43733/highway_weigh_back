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

  @Column('varchar', {
    length: 512,
    nullable: false,
  })
  name: string;

  @Column('text', {
    nullable: false,
  })
  detail: string;

  @Column('bytea', { nullable: false })
  image: Buffer;

  @Column('enum', { enum: IssueType, nullable: false })
  issue_type: IssueType;

  @Column('text', { nullable: true })
  comment?: string;

  @Column('boolean', { nullable: false, default: true })
  is_active: boolean;

  @Column('enum', {
    enum: GeneralReportStatus,
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

  //For displaying who edited i can get from this field and no need to load the relation
  @Column('int', { nullable: true })
  who_edited_by_user_id?: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'who_created_by_user_id' })
  who_created: User;

  @ManyToOne(() => Station)
  @JoinColumn({ name: 'station_id' })
  station: Station;
}
