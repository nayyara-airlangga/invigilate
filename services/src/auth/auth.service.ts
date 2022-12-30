import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/clients/database/prisma.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly prismaSvc: PrismaService) {}
}
