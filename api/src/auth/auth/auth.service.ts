import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  IsEmail,
  IsEnum,
  IsLocale,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

import { UsersService } from '@api/auth/users';
import { User } from '@api/auth/models';
import { Logger } from '@api/common';

export interface JwtPayload {
  sub: string;
  iat: number;
  id: string;
  email: string;
  name: string;
  image: string;
}

export enum Provider {
  google = 'google',
}

export class SignInDto {
  @IsEmail()
  email: string;

  @IsEnum(Provider)
  provider: Provider;

  @IsLocale()
  locale: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  fullName: string;

  @IsUrl()
  @IsOptional()
  image?: string;

  @IsString()
  accessToken: string;

  @IsString()
  idToken: string;
}

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(private users: UsersService, private jwt: JwtService) {}

  /**
   * Gets or creates a user
   * @param userSkeleton
   * @returns User created or retrieved.
   */
  async signIn(userSkeleton: SignInDto): Promise<API.AuthSignInResponse> {
    let user = await this.users.getUser({ email: userSkeleton.email });

    if (!user) {
      user = await this.users
        .createUser({
          email: userSkeleton.email,
          name: userSkeleton.fullName,
          firstName: userSkeleton.firstName,
          lastName: userSkeleton.lastName,
          locale: userSkeleton.locale,
          image: userSkeleton.image,
        })
        .catch((err: Error) => {
          if (err.message.includes('duplicate key')) {
            throw new HttpException(
              { message: 'Email already registered' },
              HttpStatus.CONFLICT,
            );
          }

          this.logger.warn(`Unknown Error: ${err.message}`);
          throw new HttpException(
            {
              dev: {
                errorMessage: err.message,
                stackTrace: err.stack,
              },
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        });
    }

    return { jwt: await this.getJwt(user) };
  }

  async getJwt(user: User) {
    const { id, name, email, image } = user;

    const payload: Omit<JwtPayload, 'sub' | 'iat'> = {
      id,
      email,
      name,
      image,
    };

    return this.jwt.sign(payload, { subject: `${user.id}` });
  }
}
