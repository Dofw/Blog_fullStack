import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { compareSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@libs/mysql/models/user.entity';

import { IStrategyOptions, Strategy } from 'passport-local';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private readonly userModel: Repository<User>,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(username: string, password: string): Promise<any> {
    // const user = await this.userModel.findOne({ username }).select('+password');

    // if (!user) throw new BadRequestException('用户不存在');

    // if (!compareSync(password, user.password))
    //   throw new BadRequestException('密码不正确');

    return { username: '123', password: 123 };
  }
}
