import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiService } from './api.service';
import { UpdateSetPointDto, UpdateModeDto } from './dto/api.dto';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('status')
  getStatus() {
    return this.apiService.getStatus();
  }

  @Get('statistics')
  getStatistics() {
    return this.apiService.getStatistics();
  }

  @Get('events')
  getEvents() {
    return this.apiService.getEvents();
  }

  @Post('setpoint')
  updateSetPoint(@Body() dto: UpdateSetPointDto) {
    return this.apiService.updateSetPoint(dto);
  }

  @Post('mode')
  updateMode(@Body() dto: UpdateModeDto) {
    return this.apiService.updateMode(dto);
  }
}
