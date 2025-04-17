import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToOne
} from "typeorm";
import { GeneralReport } from "src/general_reports/general_report.entity";
import { MainReportStatus } from "../enums/main_report_status.enums";

@Entity()
export class MainReport {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @Column('text', { nullable: true })
    comment?: string;

    @Column('bit', { nullable: false, default: true })
    is_active: boolean;

    @ManyToOne(() => GeneralReport, (generalReport) => generalReport.id)
    @JoinColumn({ name: 'general_report_id' })
    general_report: GeneralReport;

    @Column('int', {
        default: MainReportStatus.PENDING,
        nullable: false,
    })
    status: MainReportStatus
}
