import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { PrismaService } from './clients/database/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configSvc = app.get(ConfigService);

  app.enableCors({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    origin: '*',
    allowedHeaders: ['Authorization'],
    credentials: true,
  });
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  const prismaSvc = app.get(PrismaService);
  await prismaSvc.enableShutdownHooks(app);

  await app.listen(configSvc.get<string>('PORT'));
  Logger.log(
    'Server listening at port ' + configSvc.get<string>('PORT'),
    'App',
  );
}
bootstrap();
