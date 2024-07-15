import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async use(req: any, res: any, next: () => void) {
    req.user = {
      roles: 'HR_MANAGER', // This should be dynamically set based on actual user roles
    };
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const decoded = this.jwtService.verify(token);
      try {
        req.user = await this.prisma.user.findUnique({ where: { id: decoded.userId }, select: {
          id: true,
          roles: true
        }});
      } catch {
        throw new UnauthorizedException('');
      }
    } else {
      throw new UnauthorizedException('');
    }
    next();
  }
}
