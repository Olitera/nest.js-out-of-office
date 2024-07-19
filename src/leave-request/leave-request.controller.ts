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
} from '@nestjs/common';
import { LeaveRequestService } from './leave-request.service';
import { LeaveRequest } from '@prisma/client';
import { RolesGuard } from '../services/guards/roles.guard';

@Controller('leaverequests')
@UseGuards(RolesGuard)
export class LeaveRequestController {
  constructor(private readonly leaveRequestService: LeaveRequestService) {}

  @Post()
  @SetMetadata('roles', ['EMPLOYEE', 'ADMIN'])
  createLeaveRequest(@Body() data: LeaveRequest & { employee: number }) {
    return this.leaveRequestService.createLeaveRequest(data);
  }

  @Get()
  @SetMetadata('roles', ['EMPLOYEE', 'HR_MANAGER', 'PROJECT_MANAGER', 'ADMIN'])
  getAllLeaveRequests(
    @Query('sortColumn') sortColumn?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    @Query('filter') filter?: string[],
    @Query('search') search?: number,
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
  getLeaveRequestById(@Param('id') id: number) {
    return this.leaveRequestService.getLeaveRequestById(+id);
  }

  @Put(':id')
  @SetMetadata('roles', ['EMPLOYEE', 'ADMIN'])
  updateLeaveRequest(@Param('id') id: number, @Body() data: LeaveRequest) {
    return this.leaveRequestService.updateLeaveRequest(+id, data);
  }

  @Put(':id/submit')
  @SetMetadata('roles', ['EMPLOYEE','ADMIN'])
  submitLeaveRequest(@Param('id') id: number,
                     @Body() data: LeaveRequest & { approverId: number }) {
    return this.leaveRequestService.submitLeaveRequest(+id, data );
  }

  @Delete(':id')
  @SetMetadata('roles', ['ADMIN'])
  deleteLeaveRequest(@Param('id') id: number) {
    return this.leaveRequestService.deleteLeaveRequest(+id);
  }
}
