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

  async getEstimate({
    make,
    model,
    lat,
    lng,
    year,
    mileage,
  }: GetEstimateDto): Promise<any> {
    /*
    average price of selected reports

    select by MAKE and MODEL
    -5 < lng < 5
    -5 < lat < 5
    -5 < year < 5
    -3 < mileage < 3
    and sorted then
    */
    return await this.reportRepository
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .orderBy('ABS(mileage - :mileage) ', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
  }
}
