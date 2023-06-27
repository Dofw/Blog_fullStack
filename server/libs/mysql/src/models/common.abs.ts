import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { type ColumnOptions } from 'typeorm';

// 三种登录方式 - 共同抽象属性
export class BaseLoginInfo {
  @Column()
  ip: string;

  @Column()
  address: string;

  @Column({
    type: 'simple-json',
  })
  equipmentInfo: { type: string };

  @CreateDateColumn()
  createTime?: Date;

  @UpdateDateColumn()
  updateTime?: Date;

  @DeleteDateColumn()
  deleteAt?: Date;
}
