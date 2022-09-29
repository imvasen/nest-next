import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AuthController, AuthService } from '@api/auth/auth';
import { JwtAuthGuard } from '@api/auth/jwt-auth.guard';
import { JwtStrategy } from '@api/auth/jwt.strategy';
import { UsersController } from '@api/auth/users';
import { UsersService } from '@api/auth/users';
import { CommonModule } from '@api/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { User } from '@api/auth/models';
import { jwtOpts } from '@api/config';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register(jwtOpts),
  ],
  exports: [TypeOrmModule],
  providers: [
    UsersService,
    AuthService,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  controllers: [AuthController, UsersController],
})
export class AuthModule {}
