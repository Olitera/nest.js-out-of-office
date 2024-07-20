import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma/prisma.service';
import { LeaveRequest } from '@prisma/client';

@Injectable()
export class LeaveRequestService {
  constructor(private readonly prisma: PrismaService) {}

  createLeaveRequest(data: LeaveRequest & { employeeId: number }) {
    return this.prisma.employee.update({
      where: { id: data.employeeId},
      data: {
        LeaveRequest: {
          create: {
            startDate: data.startDate,
            endDate: data.endDate,
            absenceReason: data.absenceReason,
            comment: data.comment,
            status: 'new',
          },
        },
      },
      select: {
        LeaveRequest: true,
      },
    });
  }

  getAllLeaveRequests(args?: {
    sortColumn?: string;
    sortOrder?: 'asc' | 'desc';
    filter?: string[];
    search?: string;
  }) {
    const where = args?.search ? { id: +args.search } : undefined;
    return this.prisma.leaveRequest.findMany({
      orderBy: [{ [args?.sortColumn ?? 'id']: args?.sortOrder ?? 'asc' }],
      select: {
        id: true,
        employee: args?.filter?.includes('employee'),
        startDate: args?.filter?.includes('startDate'),
        endDate: args?.filter?.includes('endDate'),
        absenceReason: args?.filter?.includes('absenceReason'),
        comment: args?.filter?.includes('comment'),
        status: args?.filter?.includes('status'),
      },
      where,
    });
  }

  getLeaveRequestById(id: number) {
    return this.prisma.leaveRequest.findUnique({ where: { id } });
  }

  updateLeaveRequest(id: number, data: LeaveRequest) {
    return this.prisma.leaveRequest.update({ where: { id }, data });
  }

  submitLeaveRequest(id: number, data: LeaveRequest & { approverId: number }) {
    return this.prisma.leaveRequest.update({
      where: { id },
      data: {
        startDate: data.startDate,
        endDate: data.endDate,
        absenceReason: data.absenceReason,
        comment: data.comment,
        status: 'submitted',
        ApprovalRequest: {
          create: {
            approver: data.approverId,
            comment: data.comment,
            status: 'new',
          },
        },
      },
    });
  }

  async cancelLeaveRequest(id: number) {
    await this.prisma.approvalRequest.deleteMany({
      where: { leaveRequest: id },
    });
    return this.prisma.leaveRequest.update({
      where: { id },
      data: {
        status: 'cancelled',
        ApprovalRequest: {
          deleteMany: {},
        },
      },
    });
  }

  deleteLeaveRequest(id: number) {
    return this.prisma.leaveRequest.delete({ where: { id } });
  }
}
