import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma/prisma.service';
import { ApprovalRequest } from '@prisma/client';

@Injectable()
export class ApprovalRequestService {
  constructor(private readonly prisma: PrismaService) {}

  createApprovalRequest(data: ApprovalRequest) {
    return this.prisma.approvalRequest.create({ data });
  }
  getAllApprovalRequests(args?: {
    sortColumn?: string;
    sortOrder?: 'asc' | 'desc';
    filter?: string[];
    search?: string;
  }) {
    const where = args?.search ? { id: +args.search } : undefined;
    return this.prisma.approvalRequest.findMany({
      orderBy: [{ [args?.sortColumn ?? 'id']: args?.sortOrder ?? 'asc' }],
      select: {
        id: true,
        approver: args?.filter?.includes('approver'),
        leaveRequest: args?.filter?.includes('leaveRequest'),
        status: args?.filter?.includes('status'),
        comment: args?.filter?.includes('comment'),
      },
      where,
    });
  }

  getApprovalRequestById(id: number) {
    return this.prisma.approvalRequest.findUnique({ where: { id } });
  }

  updateApprovalRequest(id: number, data: ApprovalRequest) {
    return this.prisma.approvalRequest.update({ where: { id }, data });
  }

  async approveRequest(id: number, data: { leaveRequestId: number }) {
    const leaveRequest = await this.prisma.leaveRequest.findUnique({
      where: { id: data.leaveRequestId },
    });
    const employee = await this.prisma.employee.findUnique({
      where: { id: leaveRequest.employee },
    });
    const startDate = new Date(leaveRequest.startDate);
    const endDate = new Date(leaveRequest.endDate);
    const absentDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    return this.prisma.employee.update({
      where: { id: employee.id },
      data: {
        outOfOfficeBalance: { increment: absentDays },
        LeaveRequest: {
          update: {
            where: { id: leaveRequest.id },
            data: {
              status: 'approved',
              ApprovalRequest: {
                update: {
                  where: { id },
                  data: { status: 'approved' },
                },
              },
            },
          },
        },
      },
      include: {
        LeaveRequest: true,
      },
    });
  }

  rejectRequest(id: number, data: {leaveRequestId: number}) {
    return this.prisma.leaveRequest.update({
      where: { id: data.leaveRequestId },
      data: {
        status: 'rejected',
        ApprovalRequest: {
          update: {
            where: { id },
            data: { status: 'rejected' },
          },
        },
      },
    });
  }
  deleteApprovalRequest(id: number) {
    return this.prisma.approvalRequest.delete({ where: { id } });
  }
}
