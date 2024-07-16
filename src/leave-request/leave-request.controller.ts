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
import { LeaveRequestService } from './leave-request.service';
import { LeaveRequest } from '@prisma/client';
import { RolesGuard } from '../services/guards/roles.guard';

@Controller('leaverequests')
@UseGuards(RolesGuard)
export class LeaveRequestController {
  constructor(private readonly employeeService: LeaveRequestService) {}

  @Post()
  @SetMetadata('roles', ['EMPLOYEE', 'ADMIN'])
  createLeaveRequest(@Body() data: LeaveRequest) {
    return this.employeeService.createLeaveRequest(data);
  }

  @Get()
  @SetMetadata('roles', ['EMPLOYEE', 'HR_MANAGER', 'PROJECT_MANAGER', 'ADMIN'])
  getAllLeaveRequests(
    @Query('sortColumn') sortColumn?: string,
    @Query('sortOrder') sortOrder?: ('asc' | 'desc'),
    @Query('filter') filter?: string[],
    @Query('search') search?: number
  ) {
    return this.employeeService.getAllLeaveRequests({ sortColumn, sortOrder, filter, search });
  }

  @Get(':id')
  @SetMetadata('roles', ['EMPLOYEE', 'HR_MANAGER', 'PROJECT_MANAGER', 'ADMIN'])
  getLeaveRequestById(@Param('id') id: number) {
    return this.employeeService.getLeaveRequestById(+id);
  }

  @Put(':id')
  @SetMetadata('roles', ['EMPLOYEE', 'ADMIN'])
  updateLeaveRequest(@Param('id') id: number, @Body() data: LeaveRequest) {
    return this.employeeService.updateLeaveRequest(+id, data);
  }

  @Delete(':id')
  @SetMetadata('roles', ['ADMIN'])
  deleteLeaveRequest(@Param('id') id: number) {
    return this.employeeService.deleteLeaveRequest(+id);
  }
}
