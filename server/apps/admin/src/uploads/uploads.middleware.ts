import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class UploadsMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('uploads: middleware');
    next();
  }
}
