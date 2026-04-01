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
import { AlertsService } from './alerts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AlertFrequency } from '../../entities/alert.entity';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  plan: string;
}

@ApiTags('Alerts')
@Controller('api/alerts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Get()
  @ApiOperation({ summary: 'List all alerts' })
  async findAll(
    @CurrentUser() user: JwtPayload,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    return this.alertsService.findAll(user.sub, parseInt(page, 10) || 1, parseInt(limit, 10) || 20);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get alert with results' })
  async findOne(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.alertsService.findById(user.sub, id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create an alert' })
  async create(
    @CurrentUser() user: JwtPayload,
    @Body('name') name: string,
    @Body('query') query: string,
    @Body('filters') filters?: Record<string, unknown>,
    @Body('frequency') frequency?: AlertFrequency,
  ) {
    return this.alertsService.create(user.sub, name, query, filters, frequency);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an alert' })
  async update(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Body()
    data: Partial<{
      name: string;
      query: string;
      filters: Record<string, unknown>;
      frequency: AlertFrequency;
    }>,
  ) {
    return this.alertsService.update(user.sub, id, data);
  }

  @Patch(':id/toggle')
  @ApiOperation({ summary: 'Toggle alert active status' })
  async toggle(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.alertsService.toggle(user.sub, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an alert' })
  async remove(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.alertsService.remove(user.sub, id);
  }

  @Patch('results/:resultId/seen')
  @ApiOperation({ summary: 'Mark an alert result as seen' })
  async markSeen(
    @CurrentUser() user: JwtPayload,
    @Param('resultId') resultId: string,
  ) {
    return this.alertsService.markResultSeen(user.sub, resultId);
  }
}
