import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { PrismaService } from './clients/database/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'testing')
          .default('development'),
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.string().required(),
      }),
    }),
    AuthModule,
    UserModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
