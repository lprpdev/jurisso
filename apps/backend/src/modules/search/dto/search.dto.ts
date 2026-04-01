import {
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  Min,
  Max,
  IsDateString,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { DocumentType, Jurisdiction } from '../../../entities/document.entity';

export class SearchQueryDto {
  @ApiProperty({ description: 'Search query text', example: 'responsabilite civile' })
  @IsString()
  @MinLength(2, { message: 'La requete doit faire au moins 2 caracteres' })
  q!: string;

  @ApiPropertyOptional({ enum: DocumentType })
  @IsOptional()
  @IsEnum(DocumentType)
  type?: DocumentType;

  @ApiPropertyOptional({ enum: Jurisdiction })
  @IsOptional()
  @IsEnum(Jurisdiction)
  jurisdiction?: Jurisdiction;

  @ApiPropertyOptional({ description: 'Start date filter (ISO format)' })
  @IsOptional()
  @IsDateString()
  dateFrom?: string;

  @ApiPropertyOptional({ description: 'End date filter (ISO format)' })
  @IsOptional()
  @IsDateString()
  dateTo?: string;

  @ApiPropertyOptional({ description: 'Filter by theme' })
  @IsOptional()
  @IsString()
  theme?: string;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @ApiPropertyOptional({ enum: ['relevance', 'date_asc', 'date_desc'], default: 'relevance' })
  @IsOptional()
  @IsEnum(['relevance', 'date_asc', 'date_desc'])
  sort?: 'relevance' | 'date_asc' | 'date_desc' = 'relevance';
}
