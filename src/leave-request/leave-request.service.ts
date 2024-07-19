import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma/prisma.service';
import { LeaveRequest } from '@prisma/client';

@Injectable()
export class LeaveRequestService {
  constructor(private readonly prisma: PrismaService) {}

  createLeaveRequest(data: LeaveRequest & { employee: number }) {
    return this.prisma.employee.update({
      where: { id: data.employee },
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
    search?: number;
  }) {
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
      where: {
        id: args?.search,
      },
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
    this.prisma.approvalRequest
      .findFirst({ where: { leaveRequest: id } })
      .then(({ id }) => this.prisma.approvalRequest.delete({ where: { id } }));
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

  approveLeaveRequest(id: number) {
    return this.prisma.leaveRequest.update({
      where: { id },
      data: { status: 'approved' },
    });
  }

  deleteLeaveRequest(id: number) {
    return this.prisma.leaveRequest.delete({ where: { id } });
  }
}
