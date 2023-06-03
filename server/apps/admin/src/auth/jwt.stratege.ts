import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@libs/mysql/models/user.entity';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

export default class JwtStategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userModel: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    } as StrategyOptions);
  }

  async validate(tokenInfo: any): Promise<any> {
    // return await this.userModel.findById({ _id: tokenInfo.id });
    return 123;
  }
}
