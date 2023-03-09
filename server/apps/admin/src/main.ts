import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AdminModule } from './admin.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AdminModule);

  // cors
  app.enableCors();
  // static
  app.useStaticAssets('assets', {
    prefix: '/assets',
  });

  const config = new DocumentBuilder()
    .setTitle('Admin-Server-Api')
    .setDescription('供后台管理页面API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(3300);
}
bootstrap();
