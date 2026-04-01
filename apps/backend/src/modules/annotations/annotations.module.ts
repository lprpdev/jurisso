import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnotationsController } from './annotations.controller';
import { AnnotationsService } from './annotations.service';
import { Annotation } from '../../entities/annotation.entity';
import { Document } from '../../entities/document.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Annotation, Document])],
  controllers: [AnnotationsController],
  providers: [AnnotationsService],
  exports: [AnnotationsService],
})
export class AnnotationsModule {}
