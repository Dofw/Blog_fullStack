import { UploadsMiddleware } from './uploads.middleware';

describe('UploadsMiddleware', () => {
  it('should be defined', () => {
    expect(new UploadsMiddleware()).toBeDefined();
  });
});
