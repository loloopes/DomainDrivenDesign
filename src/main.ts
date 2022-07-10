import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/module/app.module';
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { DomainErrorsInterceptor } from './infrastructure/interceptors/domain-errors.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new DomainErrorsInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  ),
    await app.listen(3000);
}
bootstrap();
