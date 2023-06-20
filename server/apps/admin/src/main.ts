import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AdminModule } from './admin.module';
import { GlobalErrorFilter } from './errorFilter/global.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AdminModule);

  // cors
  app.enableCors();

  // static
  app.useStaticAssets('assets', {
    prefix: '/assets',
  });

  // 全局异常过滤器
  app.useGlobalFilters(new GlobalErrorFilter());

  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Admin-Server-Api')
    .setDescription('供后台管理页面API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  const Port = configService.get('port');
  await app.listen(Port);
  console.log(`http://localhost:${Port}`);
}
bootstrap();
