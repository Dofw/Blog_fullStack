import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseLoginInfo } from './common.abs';
import { hashSync } from 'bcrypt';

@Entity('login_user')
export class LoginUser extends BaseLoginInfo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  username: string;

  @Column({
    select: false,
    transformer: {
      from(val) {
        return val;
      },
      to(val) {
        return hashSync(val, 5);
      },
    },
  })
  password: string;
}
