import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateAccessToken(payload: { userId: number; login: string }) {
    return this.jwtService.sign(payload, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME || '12h',
    });
  }

  generateRefreshToken(payload: { userId: number; login: string }) {
    return this.jwtService.sign(payload, {
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME || '36h',
    });
  }

  verifyRefreshToken(token: string) {
    return this.jwtService.verify(token);
  }
}
