// SetMetadata 工厂函数
import { SetMetadata } from '@nestjs/common';

export const PASS_JWT = 'passJwt';
export function PassJwt() {
  return SetMetadata(PASS_JWT, true);
}
