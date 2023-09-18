import { Injectable, NotFoundException } from '@nestjs/common';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { User } from 'src/users/user.entity';
import { GetEstimateDto } from './dto/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}

  async createReport(reportDto: CreateReportDto, user: User): Promise<Report> {
    const report = this.reportRepository.create(reportDto);
    report.user = user;

    await this.reportRepository.save(report);

    return report;
  }

  async findOneReport(id: number): Promise<Report> {
    if (!id) {
      throw new NotFoundException();
    }

    const report = await this.reportRepository.findOneBy({ id });

    if (!report) {
      throw new NotFoundException();
    }

    return report;
  }

  async changeReportApproval(
    id: number,
    approved: boolean,
    user: User,
  ): Promise<Report> {
    const report = await this.findOneReport(id);

    report.approved = approved;

    await this.reportRepository.save(report);

    return { ...report, user };
  }

  async getEstimate(estimateDto: GetEstimateDto): Promise<any> {
    return await this.reportRepository
      .createQueryBuilder()
      .select('*')
      .where('make = :make', { make: estimateDto.make })
      .getRawMany();
  }
}
