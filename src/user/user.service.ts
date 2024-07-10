import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  createUser(data: { login: string; password: string; roles: string }) {
    return this.prisma.user.create({ data });
  }

  getUserByLogin(login: string) {
    return this.prisma.user.findFirst({ where: { login } });
  }
}
