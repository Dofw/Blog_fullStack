import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  Catch,
} from '@nestjs/common';

@Catch(HttpException)
export class SpecialErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = exception.getStatus();
    const msg = exception.getResponse();

    let jsonObj;
    if (typeof msg === 'string') {
      jsonObj = {
        status,
        message: msg,
      };
    } else {
      jsonObj = msg;
    }

    response.status(status).json({ ...jsonObj, _is: true });
  }
}
