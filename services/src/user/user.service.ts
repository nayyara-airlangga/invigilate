import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/clients/database/prisma.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prismaSvc: PrismaService) {}
}
