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
import { CollectionsService } from './collections.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  plan: string;
}

@ApiTags('Collections')
@Controller('api/collections')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get()
  @ApiOperation({ summary: 'List all collections' })
  async findAll(
    @CurrentUser() user: JwtPayload,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.collectionsService.findAll(user.sub, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get collection with documents' })
  async findOne(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.collectionsService.findById(user.sub, id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a collection' })
  async create(
    @CurrentUser() user: JwtPayload,
    @Body('name') name: string,
    @Body('description') description?: string,
    @Body('color') color?: string,
    @Body('isPublic') isPublic?: boolean,
  ) {
    return this.collectionsService.create(user.sub, name, description, color, isPublic);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a collection' })
  async update(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Body() data: Partial<{ name: string; description: string; color: string; isPublic: boolean }>,
  ) {
    return this.collectionsService.update(user.sub, id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a collection' })
  async remove(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.collectionsService.remove(user.sub, id);
  }

  @Post(':id/documents')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add a document to a collection' })
  async addDocument(
    @CurrentUser() user: JwtPayload,
    @Param('id') collectionId: string,
    @Body('documentId') documentId: string,
    @Body('note') note?: string,
  ) {
    return this.collectionsService.addDocument(user.sub, collectionId, documentId, note);
  }

  @Delete(':id/documents/:documentId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove a document from a collection' })
  async removeDocument(
    @CurrentUser() user: JwtPayload,
    @Param('id') collectionId: string,
    @Param('documentId') documentId: string,
  ) {
    return this.collectionsService.removeDocument(user.sub, collectionId, documentId);
  }

  @Patch(':id/documents/reorder')
  @ApiOperation({ summary: 'Reorder documents in a collection' })
  async reorderDocuments(
    @CurrentUser() user: JwtPayload,
    @Param('id') collectionId: string,
    @Body('documentIds') documentIds: string[],
  ) {
    return this.collectionsService.reorderDocuments(user.sub, collectionId, documentIds);
  }
}
