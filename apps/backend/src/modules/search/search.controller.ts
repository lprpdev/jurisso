import {
  Controller,
  Get,
  Delete,
  Query,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { SearchQueryDto } from './dto/search.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  plan: string;
}

@ApiTags('Search')
@Controller('api/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Full-text search across legal documents' })
  async search(@Query() dto: SearchQueryDto, @CurrentUser() user: JwtPayload) {
    return this.searchService.search(dto, user.sub);
  }

  @Get('suggest')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Search suggestions / autocomplete' })
  async suggest(
    @Query('q') query: string,
    @Query('limit') limit: string = '10',
  ) {
    return this.searchService.suggest(query, parseInt(limit, 10) || 10);
  }

  @Get('history')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get search history' })
  async getHistory(
    @CurrentUser() user: JwtPayload,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    return this.searchService.getHistory(user.sub, parseInt(page, 10) || 1, parseInt(limit, 10) || 20);
  }

  @Delete('history')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Clear all search history' })
  async deleteHistory(@CurrentUser() user: JwtPayload) {
    return this.searchService.deleteHistory(user.sub);
  }

  @Delete('history/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a specific search history entry' })
  async deleteHistoryEntry(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
  ) {
    return this.searchService.deleteHistoryEntry(user.sub, id);
  }
}
