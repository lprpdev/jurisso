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
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  plan: string;
}

@ApiTags('Favorites')
@Controller('api/favorites')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'List all favorites' })
  async findAll(
    @CurrentUser() user: JwtPayload,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.favoritesService.findAll(user.sub, page, limit);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add a document to favorites' })
  async create(
    @CurrentUser() user: JwtPayload,
    @Body('documentId') documentId: string,
    @Body('note') note?: string,
  ) {
    return this.favoritesService.create(user.sub, documentId, note);
  }

  @Get('check/:documentId')
  @ApiOperation({ summary: 'Check if a document is favorited' })
  async check(
    @CurrentUser() user: JwtPayload,
    @Param('documentId') documentId: string,
  ) {
    return this.favoritesService.checkFavorite(user.sub, documentId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update favorite note' })
  async update(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Body('note') note: string,
  ) {
    return this.favoritesService.update(user.sub, id, note);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove from favorites' })
  async remove(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.favoritesService.remove(user.sub, id);
  }
}
