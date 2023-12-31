import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../users/user.entity';
import { CurrentUser } from '../decorators/current-user.decorator';
import { ReportDto } from './dto/report.dto';
import { Report } from './report.entity';
import { ApproveReportDto } from './dto/approve-report.dto';
import { AdminGuard } from '../guards/admin.guard';
import { Serialize } from '../decorators/serialize.decorator';
import { GetEstimateDto } from './dto/get-estimate.dto';

@Serialize(ReportDto)
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createReport(
    @Body() body: CreateReportDto,
    @CurrentUser() user: User,
  ): Promise<Report> {
    return await this.reportsService.createReport(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  async changeReportApproval(
    @Param('id') id: string,
    @Body() body: ApproveReportDto,
    @CurrentUser() user: User,
  ): Promise<Report> {
    return await this.reportsService.changeReportApproval(
      parseInt(id),
      body.approved,
      user,
    );
  }

  @Get()
  // TODO: resolve any type
  async getEstimate(@Query() query: GetEstimateDto): Promise<any> {
    return await this.reportsService.getEstimate(query);
  }
}
