import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma/prisma.service';
import { LeaveRequest } from '@prisma/client';

@Injectable()
export class LeaveRequestService {
  constructor(private readonly prisma: PrismaService) {}

  createLeaveRequest(data: LeaveRequest) {
    return this.prisma.leaveRequest.create({ data });
  }
  getAllLeaveRequests() {
    return this.prisma.leaveRequest.findMany();
  }

  getLeaveRequestById(id: number) {
    return this.prisma.leaveRequest.findUnique({ where: { id } });
  }

  updateLeaveRequest(id: number, data: LeaveRequest) {
    return this.prisma.leaveRequest.update({ where: { id }, data });
  }
  deleteLeaveRequest(id: number) {
    return this.prisma.leaveRequest.delete({ where: { id } });
  }
}
