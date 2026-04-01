import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { Favorite } from './favorite.entity';
import { CollectionDocument } from './collection-document.entity';
import { Annotation } from './annotation.entity';

export enum DocumentType {
  DECISION = 'decision',
  LOI = 'loi',
  DECRET = 'decret',
  ARRETE = 'arrete',
  CIRCULAIRE = 'circulaire',
  CODE = 'code',
  ARTICLE = 'article',
}

export enum Jurisdiction {
  COUR_CASSATION = 'cour_cassation',
  CONSEIL_ETAT = 'conseil_etat',
  CONSEIL_CONSTITUTIONNEL = 'conseil_constitutionnel',
  COUR_APPEL = 'cour_appel',
  TRIBUNAL_JUDICIAIRE = 'tribunal_judiciaire',
  TRIBUNAL_ADMINISTRATIF = 'tribunal_administratif',
  COUR_ADMINISTRATIVE_APPEL = 'cour_administrative_appel',
  AUTRE = 'autre',
}

@Entity('documents')
@Index('idx_documents_search_vector', { synchronize: false })
@Index('idx_documents_type', ['type'])
@Index('idx_documents_jurisdiction', ['jurisdiction'])
@Index('idx_documents_date', ['dateDecision'])
@Index('idx_documents_reference', ['reference'])
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100, unique: true })
  legifranceId!: string;

  @Column({ type: 'enum', enum: DocumentType })
  type!: DocumentType;

  @Column({ type: 'text' })
  title!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'text', nullable: true })
  summary!: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  reference!: string | null;

  @Column({ type: 'enum', enum: Jurisdiction, nullable: true })
  jurisdiction!: Jurisdiction | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  chamber!: string | null;

  @Column({ type: 'date', nullable: true })
  dateDecision!: Date | null;

  @Column({ type: 'date', nullable: true })
  datePublication!: Date | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  numberEcli!: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  numberPourvoi!: string | null;

  @Column({ type: 'jsonb', default: [] })
  themes!: string[];

  @Column({ type: 'jsonb', default: [] })
  keywords!: string[];

  @Column({ type: 'jsonb', nullable: true })
  metadata!: Record<string, unknown> | null;

  @Column({
    type: 'tsvector',
    select: false,
    nullable: true,
  })
  searchVector!: string | null;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @OneToMany(() => Favorite, (favorite) => favorite.document)
  favorites!: Favorite[];

  @OneToMany(() => CollectionDocument, (cd) => cd.document)
  collectionDocuments!: CollectionDocument[];

  @OneToMany(() => Annotation, (annotation) => annotation.document)
  annotations!: Annotation[];
}
