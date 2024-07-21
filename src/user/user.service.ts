import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma/prisma.service';
import { Employee } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(
    data: { login: string; password: string; roles: string } & Employee,
  ) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        login: data.login,
        password: hashedPassword,
        roles: data.roles,
        Employee: {
          create: {
            fullname: data.fullname,
            subdivision: data.subdivision,
            position: data.roles,
            status: data.status,
            outOfOfficeBalance: data.outOfOfficeBalance,
          },
        },
      },
      select: {
        id: true,
        login: true,
        roles: true,
        Employee: true,
      },
    });
  }

  getUserByLogin(login: string) {
    return this.prisma.user.findFirst({ where: { login } });
  }
}
