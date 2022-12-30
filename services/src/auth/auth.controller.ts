import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from './message/request.message';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authSvc: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginRequest): Promise<void> {
    return this.authSvc.login({ ...body });
  }
}
