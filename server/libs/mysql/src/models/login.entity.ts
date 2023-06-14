import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  type ColumnOptions,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LoginEnum } from './login.enum';
// import { hashSync } from 'bcrypt';

@Entity()
export class Login {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  username: string; // 用户登录方式

  @Column()
  password: string;

  // @Column()
  // phone: string; // 手机登录方式

  // 以下是登录记录信息
  @Column()
  ip: string;

  @Column()
  address: string;

  @Column()
  equipmentInfo?: string; // 设备信息

  @Column({
    type: 'enum',
    enum: LoginEnum,
  } as ColumnOptions)
  loginType: number; // 登录类型

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
