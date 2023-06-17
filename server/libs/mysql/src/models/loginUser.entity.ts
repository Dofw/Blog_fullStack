import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseLoginInfo } from './common.abs';
import { hashSync } from 'bcrypt';

@Entity('login_user')
export class LoginUser extends BaseLoginInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({
    select: false,
    transformer: {
      from(val) {
        return val;
      },
      to(val) {
        console.log(113);
        return hashSync(val, 5);
      },
    },
  })
  password: string;
}
