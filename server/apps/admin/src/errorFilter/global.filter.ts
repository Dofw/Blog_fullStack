import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException) // 负责捕获 HttpException 类的异常。
export class GlobalErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
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

    response.status(status).json(jsonObj);
  }
}
