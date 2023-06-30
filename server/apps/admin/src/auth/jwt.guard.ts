import { Reflector } from '@nestjs/core';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PASS_JWT } from '../_function/decorators/passJwt.decorator';

@Injectable()
export default class JwtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const isPassJwt = this.reflector.getAllAndOverride<boolean>(PASS_JWT, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 放行。
    if (isPassJwt) {
      return true;
    }
    // 进入 jwt.stratege 策略内部的 gurad。
    return super.canActivate(context);
  }
}
