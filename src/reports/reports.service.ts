import { Injectable } from '@nestjs/common';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}

  async createReport(reportDto: CreateReportDto): Promise<Report> {
    const report = this.reportRepository.create(reportDto);

    await this.reportRepository.save(report);

    return report;
  }
}
