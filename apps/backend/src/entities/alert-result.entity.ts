import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Alert } from './alert.entity';
import { Document } from './document.entity';

@Entity('alert_results')
@Index('idx_alert_results_alert', ['alertId'])
export class AlertResult {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  alertId!: string;

  @Column({ type: 'uuid' })
  documentId!: string;

  @Column({ type: 'boolean', default: false })
  seen!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @ManyToOne(() => Alert, (alert) => alert.results, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'alertId' })
  alert!: Alert;

  @ManyToOne(() => Document, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'documentId' })
  document!: Document;
}
