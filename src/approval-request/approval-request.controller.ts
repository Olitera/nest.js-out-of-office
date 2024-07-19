import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApprovalRequestService } from './approval-request.service';
import { ApprovalRequest } from '@prisma/client';
import { RolesGuard } from '../services/guards/roles.guard';

@Controller('approvalrequests')
@UseGuards(RolesGuard)
export class ApprovalRequestController {
  constructor(private readonly approvalRequestService: ApprovalRequestService) {}

  @Post()
  @SetMetadata('roles', ['ADMIN'])
  createApprovalRequest(@Body() data: ApprovalRequest) {
    return this.approvalRequestService.createApprovalRequest(data);
  }

  @Get()
  @SetMetadata('roles', ['HR_MANAGER', 'PROJECT_MANAGER', 'ADMIN'])
  getAllApprovalRequests(
    @Query('sortColumn') sortColumn?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    @Query('filter') filter?: string[],
    @Query('search') search?: number,
  ) {
    return this.approvalRequestService.getAllApprovalRequests({sortColumn,
      sortOrder,
      filter,
      search});
  }

  @Get(':id')
  @SetMetadata('roles', ['HR_MANAGER', 'PROJECT_MANAGER', 'ADMIN'])
  getApprovalRequestById(@Param('id') id: number) {
    return this.approvalRequestService.getApprovalRequestById(+id);
  }

  @Put(':id')
  @SetMetadata('roles', ['HR_MANAGER', 'PROJECT_MANAGER', 'ADMIN'])
  updateApprovalRequest(
    @Param('id') id: number,
    @Body() data: ApprovalRequest,
  ) {
    return this.approvalRequestService.updateApprovalRequest(+id, data);
  }

  @Put(':id/approve-request')
  @SetMetadata('roles', ['HR_MANAGER', 'ADMIN'])
  approveRequest(
    @Param('id') id: number,
    @Body() leaveRequestId: { id: number },
    @Body() employeeId: { id: number },
  ) {
    return this.approvalRequestService.approveRequest(+id, leaveRequestId, employeeId);
  }

  @Delete(':id')
  @SetMetadata('roles', ['ADMIN'])
  deleteApprovalRequest(@Param('id') id: number) {
    return this.approvalRequestService.deleteApprovalRequest(+id);
  }
}
