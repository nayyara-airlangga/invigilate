import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';
import * as crypto from 'crypto';
import { PrismaService } from 'src/clients/database/prisma.service';
import { hashConfig } from './config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly prismaSvc: PrismaService) {}

  async hashPassword(password: string): Promise<string> {
    const salt = crypto.randomBytes(16);
    return await argon2.hash(password, {
      ...hashConfig,
      salt,
    });
  }

  async verifyPasswordFromHash(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await argon2.verify(hash, password, hashConfig);
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> {
    let user: User | null;
    try {
      user = await this.prismaSvc.user.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
    if (user === null) throw new NotFoundException('User not found');
    if (!(await this.verifyPasswordFromHash(password, user.passwordHash))) {
      throw new BadRequestException('Incorrect password');
    }
  }
}
