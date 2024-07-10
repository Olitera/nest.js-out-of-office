import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma/prisma.service';
import { ApprovalRequest } from '@prisma/client';

@Injectable()
export class ApprovalRequestService {
  constructor(private readonly prisma: PrismaService) {}

  createApprovalRequest(data: ApprovalRequest) {
    return this.prisma.approvalRequest.create({ data });
  }
  getAllApprovalRequests() {
    return this.prisma.approvalRequest.findMany();
  }

  getApprovalRequestById(id: number) {
    return this.prisma.approvalRequest.findUnique({ where: { id } });
  }

  updateApprovalRequest(id: number, data: ApprovalRequest) {
    return this.prisma.approvalRequest.update({ where: { id }, data });
  }
  deleteApprovalRequest(id: number) {
    return this.prisma.approvalRequest.delete({ where: { id } });
  }
}
