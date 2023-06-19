import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LoginUser } from '@libs/mysql/models/loginUser.entity';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

export default class JwtStategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(LoginUser)
    private readonly userInfoModel: Repository<LoginUser>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    } as StrategyOptions);
  }

  async validate(tokenInfo: any): Promise<any> {
    console.log(111, tokenInfo);
    return await this.userInfoModel.findOne({
      select: ['username', 'password', 'id'],
      where: { id: tokenInfo.id },
    });
  }
}
