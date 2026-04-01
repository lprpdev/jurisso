import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  Index,
} from 'typeorm';
import { Collection } from './collection.entity';
import { Document } from './document.entity';

@Entity('collection_documents')
export class CollectionDocument {
  @PrimaryColumn({ type: 'uuid' })
  collectionId!: string;

  @PrimaryColumn({ type: 'uuid' })
  documentId!: string;

  @Column({ type: 'text', nullable: true })
  note!: string | null;

  @Index()
  @Column({ type: 'int', default: 0 })
  position!: number;

  @CreateDateColumn({ type: 'timestamp' })
  addedAt!: Date;

  @ManyToOne(() => Collection, (collection) => collection.collectionDocuments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'collectionId' })
  collection!: Collection;

  @ManyToOne(() => Document, (document) => document.collectionDocuments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'documentId' })
  document!: Document;
}
