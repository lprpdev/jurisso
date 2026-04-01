import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { Document } from './document.entity';

export enum AnnotationType {
  HIGHLIGHT = 'highlight',
  NOTE = 'note',
  BOOKMARK = 'bookmark',
}

@Entity('annotations')
@Index('idx_annotations_user_document', ['userId', 'documentId'])
export class Annotation {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column({ type: 'uuid' })
  userId!: string;

  @Index()
  @Column({ type: 'uuid' })
  documentId!: string;

  @Column({ type: 'enum', enum: AnnotationType, default: AnnotationType.NOTE })
  type!: AnnotationType;

  @Column({ type: 'text', nullable: true })
  content!: string | null;

  @Column({ type: 'text', nullable: true })
  selectedText!: string | null;

  @Column({ type: 'int', nullable: true })
  startOffset!: number | null;

  @Column({ type: 'int', nullable: true })
  endOffset!: number | null;

  @Column({ type: 'varchar', length: 7, default: '#FBBF24' })
  color!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.annotations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => Document, (document) => document.annotations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'documentId' })
  document!: Document;
}
