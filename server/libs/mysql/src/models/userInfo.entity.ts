import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_info')
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nikename: string;
}
