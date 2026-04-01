import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AnnotationsService } from './annotations.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AnnotationType } from '../../entities/annotation.entity';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  plan: string;
}

@ApiTags('Annotations')
@Controller('api/annotations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AnnotationsController {
  constructor(private readonly annotationsService: AnnotationsService) {}

  @Get()
  @ApiOperation({ summary: 'List all annotations' })
  async findAll(
    @CurrentUser() user: JwtPayload,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    return this.annotationsService.findAll(user.sub, parseInt(page, 10) || 1, parseInt(limit, 10) || 20);
  }

  @Get('document/:documentId')
  @ApiOperation({ summary: 'Get annotations for a document' })
  async findByDocument(
    @CurrentUser() user: JwtPayload,
    @Param('documentId') documentId: string,
  ) {
    return this.annotationsService.findByDocument(user.sub, documentId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create an annotation' })
  async create(
    @CurrentUser() user: JwtPayload,
    @Body()
    body: {
      documentId: string;
      type?: AnnotationType;
      content?: string;
      selectedText?: string;
      startOffset?: number;
      endOffset?: number;
      color?: string;
    },
  ) {
    const { documentId, ...data } = body;
    return this.annotationsService.create(user.sub, documentId, data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an annotation' })
  async update(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Body() data: Partial<{ content: string; color: string; type: AnnotationType }>,
  ) {
    return this.annotationsService.update(user.sub, id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an annotation' })
  async remove(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.annotationsService.remove(user.sub, id);
  }
}
