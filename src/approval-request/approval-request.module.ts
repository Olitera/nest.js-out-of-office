import { Module } from '@nestjs/common';
import { ApprovalRequestController } from './approval-request.controller';
import { PrismaService } from '../services/prisma/prisma.service';
import { ApprovalRequestService } from './approval-request.service';
import { LeaveRequestService } from '../leave-request/leave-request.service';
import { EmployeeService } from '../employee/employee.service';

@Module({
  controllers: [ApprovalRequestController],
  providers: [
    ApprovalRequestService,
    PrismaService,
    LeaveRequestService,
    EmployeeService,
  ],
})
export class ApprovalRequestModule {}
