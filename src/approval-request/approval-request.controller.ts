import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  SetMetadata,
  UseGuards,
  Res
} from '@nestjs/common';
import { ApprovalRequestService } from './approval-request.service';
import { ApprovalRequest } from '@prisma/client';
import { RolesGuard } from '../services/guards/roles.guard';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

@Controller('approvalrequests')
@UseGuards(RolesGuard)
export class ApprovalRequestController {
  constructor(
    private readonly approvalRequestService: ApprovalRequestService,
  ) {}

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
    @Query('search') search?: string,
  ) {
    return this.approvalRequestService.getAllApprovalRequests({
      sortColumn,
      sortOrder,
      filter,
      search,
    });
  }

  @Get(':id')
  @SetMetadata('roles', ['HR_MANAGER', 'PROJECT_MANAGER', 'ADMIN'])
  async getApprovalRequestById(
    @Param('id') id: number,
    @Res({passthrough: true}) res: Response) {
    const approvalRequest =  await this.approvalRequestService.getApprovalRequestById(+id);
    if(!approvalRequest) {
      res
        .status(StatusCodes.NOT_FOUND)
        .send('Approval Request not found');
      return
    }
    return approvalRequest
  }

  @Put(':id')
  @SetMetadata('roles', ['ADMIN'])
  updateApprovalRequest(
    @Param('id') id: number,
    @Body() data: ApprovalRequest,
  ) {
    return this.approvalRequestService.updateApprovalRequest(+id, data);
  }

  @Put(':id/approve')
  @SetMetadata('roles', ['HR_MANAGER', 'PROJECT_MANAGER', 'ADMIN'])
  approveRequest(
    @Param('id') id: number,
    @Body() data: { leaveRequestId: number },
  ) {
    return this.approvalRequestService.approveRequest(+id, data);
  }

  @Put(':id/reject')
  @SetMetadata('roles', ['HR_MANAGER', 'PROJECT_MANAGER', 'ADMIN'])
  rejectRequest(
    @Param('id') id: number,
    @Body() data: { leaveRequestId: number },
  ) {
    return this.approvalRequestService.rejectRequest(+id, data);
  }

  @Delete(':id')
  @SetMetadata('roles', ['ADMIN'])
  deleteApprovalRequest(@Param('id') id: number) {
    return this.approvalRequestService.deleteApprovalRequest(+id);
  }
}
