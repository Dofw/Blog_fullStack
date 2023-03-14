import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    request.$$$test = '123';

    console.log('uploadIntercept');

    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${request.$$$test}`)));
  }
}

/**
 * // 说明
 *
 * 将interceptor 传递参数。源码中 import { FileInterceptor } from '@nestjs/platform-express';
 * FileInterceptor, 做了封装实现。
 *
 * import {mixin} from "@nest/common"
 *
 * class MixinInterceptor implements NestInterceptor{}
 *
 * const Interceptor = mixin(MixinInterceptor);
 *
 * 不需要 @Injectable(), mixin(class) 进行了元数据的定义，mixin 内部就是调用了Injectable()(class)。
 *
 * // scanner.ts insertProvider方法。 搜索 enhancerSubtype ( APP_GUARD、APP_PIPE、APP_FILTER、APP_INTERCEPTOR )
 */
