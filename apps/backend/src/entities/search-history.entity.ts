import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';

@Entity('search_history')
@Index('idx_search_history_user_date', ['userId', 'createdAt'])
export class SearchHistory {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column({ type: 'uuid' })
  userId!: string;

  @Column({ type: 'text' })
  query!: string;

  @Column({ type: 'jsonb', nullable: true })
  filters!: Record<string, unknown> | null;

  @Column({ type: 'int', default: 0 })
  resultsCount!: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.searchHistory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User;
}
