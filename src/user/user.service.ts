import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma/prisma.service';
import { Employee } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  createUser(data: { login: string; password: string; roles: string } & Employee) {
    return this.prisma.user.create({
      data: {
        login: data.login,
        password: data.password,
        roles: data.roles,
        Employee: {
          create: {
            fullname: data.fullname,
            subdivision: data.subdivision,
            position: data.position,
            status: data.status,
            outOfOfficeBalance: data.outOfOfficeBalance
          }
        }
      }
    });
  }

  getUserByLogin(login: string) {
    return this.prisma.user.findFirst({ where: { login } });
  }
}
