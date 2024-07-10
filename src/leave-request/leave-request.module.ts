import { Module } from '@nestjs/common';
import { LeaveRequestController } from './leave-request.controller';
import { PrismaService } from '../services/prisma/prisma.service';
import { LeaveRequestService } from './leave-request.service';


@Module({
  controllers: [LeaveRequestController],
  providers: [LeaveRequestService, PrismaService],
})
export class LeaveRequestModule {}
