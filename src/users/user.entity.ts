import { Logger } from '@nestjs/common';
import { Report } from 'src/reports/report.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Report, (report) => report.user)
  reports: Array<Report>;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    Logger.log(`Inserted User with ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    Logger.log('Removed User');
  }

  @AfterUpdate()
  logUpdate() {
    Logger.log(`Updated User with id ${this.id}`);
  }
}
