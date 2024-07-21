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
import { LeaveRequestService } from './leave-request.service';
import { LeaveRequest } from '@prisma/client';
import { RolesGuard } from '../services/guards/roles.guard';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

@Controller('leaverequests')
@UseGuards(RolesGuard)
export class LeaveRequestController {
  constructor(private readonly leaveRequestService: LeaveRequestService) {}

  @Post()
  @SetMetadata('roles', ['EMPLOYEE', 'ADMIN'])
  createLeaveRequest(
    @Body() data: LeaveRequest & { employeeId: number },
    @Res({passthrough: true}) res: Response) {
    if(!data?.startDate || !data?.endDate || !data?.absenceReason || !data?.status || !data?.employeeId) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send('Required fields are not filled in');
      return
    }
    return this.leaveRequestService.createLeaveRequest(data);
  }

  @Get()
  @SetMetadata('roles', ['EMPLOYEE', 'HR_MANAGER', 'PROJECT_MANAGER', 'ADMIN'])
  getAllLeaveRequests(
    @Query('sortColumn') sortColumn?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    @Query('filter') filter?: string[],
    @Query('search') search?: string,
  ) {
    return this.leaveRequestService.getAllLeaveRequests({
      sortColumn,
      sortOrder,
      filter,
      search,
    });
  }

  @Get(':id')
  @SetMetadata('roles', ['EMPLOYEE', 'HR_MANAGER', 'PROJECT_MANAGER', 'ADMIN'])
  async getLeaveRequestById(
    @Param('id') id: number,
    @Res({passthrough: true}) res: Response) {
    const leaveRequest = await this.leaveRequestService.getLeaveRequestById(+id);
    if(!leaveRequest) {
      res
        .status(StatusCodes.NOT_FOUND)
        .send('Leave request not found');
      return
    }
    return leaveRequest
  }

  @Put(':id')
  @SetMetadata('roles', ['EMPLOYEE', 'ADMIN'])
  updateLeaveRequest(@Param('id') id: number, @Body() data: LeaveRequest) {
    return this.leaveRequestService.updateLeaveRequest(+id, data);
  }

  @Put(':id/submit')
  @SetMetadata('roles', ['EMPLOYEE', 'ADMIN'])
  submitLeaveRequest(
    @Param('id') id: number,
    @Body() data: LeaveRequest & { approverId: number },
  ) {
    return this.leaveRequestService.submitLeaveRequest(+id, data);
  }

  @Put(':id/cancel')
  @SetMetadata('roles', ['EMPLOYEE', 'ADMIN'])
  cancelLeaveRequest(@Param('id') id: number) {
    return this.leaveRequestService.cancelLeaveRequest(+id);
  }

  @Delete(':id')
  @SetMetadata('roles', ['ADMIN'])
  deleteLeaveRequest(@Param('id') id: number) {
    return this.leaveRequestService.deleteLeaveRequest(+id);
  }
}
