import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/users/user.entity';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { ReportDto } from './dto/report.dto';
import { Report } from './report.entity';
import { ApproveReportDto } from './dto/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { Serialize } from 'src/decorators/serialize.decorator';

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
}
