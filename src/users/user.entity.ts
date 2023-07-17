import { Logger } from '@nestjs/common';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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
    Logger.log(`Removed User with ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    Logger.log(`Updated User with id ${this.id}`);
  }
}
