import { Body, Controller, Post } from '@nestjs/common';

import { AuthService, SignInDto } from '@api/auth/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('sign-in')
  signIn(@Body() body: SignInDto) {
    return this.auth.signIn(body);
  }
}
