import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PlansGuard } from '../auth/guards/plans.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RequiresPlan } from '../auth/decorators/plans.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Document } from '../../entities/document.entity';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  plan: string;
}

@ApiTags('Documents')
@Controller('api/documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a document by ID' })
  async findOne(@Param('id') id: string) {
    return this.documentsService.findById(id);
  }

  @Get(':id/related')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get related documents' })
  async findRelated(
    @Param('id') id: string,
    @Query('limit') limit: string = '10',
  ) {
    return this.documentsService.findRelated(id, parseInt(limit, 10) || 10);
  }

  @Get(':id/export/pdf')
  @UseGuards(JwtAuthGuard, PlansGuard)
  @RequiresPlan('pro', 'enterprise')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Export document as PDF (pro+ plan required)' })
  async exportPdf(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.documentsService.exportPdf(id, user.sub);
  }

  @Post('sync')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'super_admin')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Sync documents from external source (admin)' })
  async sync(@Body() documents: Partial<Document>[]) {
    return this.documentsService.syncDocuments(documents);
  }
}
