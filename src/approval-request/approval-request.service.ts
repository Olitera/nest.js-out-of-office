import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma/prisma.service';
import { ApprovalRequest } from '@prisma/client';
import { LeaveRequestService } from '../leave-request/leave-request.service';
import { EmployeeService } from '../employee/employee.service';

@Injectable()
export class ApprovalRequestService {
  constructor(private readonly prisma: PrismaService,
              private leaveRequestService: LeaveRequestService,
              private employeeService: EmployeeService) {}

  createApprovalRequest(data: ApprovalRequest) {
    return this.prisma.approvalRequest.create({ data });
  }
  getAllApprovalRequests(args?: {
    sortColumn?: string;
    sortOrder?: 'asc' | 'desc';
    filter?: string[];
    search?: number;
  }) {
    return this.prisma.approvalRequest.findMany({
      orderBy: [{ [args?.sortColumn ?? 'id']: args?.sortOrder ?? 'asc' }],
      select: {
        id: true,
        approver: args?.filter?.includes('approver'),
        leaveRequest: args?.filter?.includes('leaveRequest'),
        status: args?.filter?.includes('status'),
        comment: args?.filter?.includes('comment'),
      },
      where: {
        id: args?.search,
      },
    });
  }

  getApprovalRequestById(id: number) {
    return this.prisma.approvalRequest.findUnique({ where: { id } });
  }

  updateApprovalRequest(id: number, data: ApprovalRequest) {
    return this.prisma.approvalRequest.update({ where: { id }, data });
  }

  async approveRequest(id: number, leaveRequest: { id: number }, employee: { id: number }) {
    return this.prisma.approvalRequest.update({
      where: { id },
      data: { status: 'approved' },
      include: {
        leaveRequestAR: true,
        approverAR: true,
      },
    })
      .then(() => {
        this.leaveRequestService.approveLeaveRequest(leaveRequest.id)
        this.employeeService.recalculateAbsenceBalance(employee.id)})
  }
  deleteApprovalRequest(id: number) {
    return this.prisma.approvalRequest.delete({ where: { id } });
  }
}
