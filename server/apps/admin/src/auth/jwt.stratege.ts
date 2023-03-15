import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

export default class JwtStategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // ??
      secretOrKey: process.env.SECRET,
    } as StrategyOptions);
  }

  async validate(payload: any): Promise<any> {
    return payload;
  }
}
