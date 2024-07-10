import { Module } from '@nestjs/common';
import { ApprovalRequestController } from './approval-request.controller';
import { PrismaService } from '../services/prisma/prisma.service';
import { ApprovalRequestService } from './approval-request.service';

@Module({
  controllers: [ApprovalRequestController],
  providers: [ApprovalRequestService, PrismaService],
})
export class ApprovalRequestModule {}
