import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LeaveRequestService } from './leave-request.service';
import { LeaveRequest  } from '@prisma/client';

@Controller('leaverequests')
export class LeaveRequestController {
  constructor(private readonly employeeService: LeaveRequestService) {}

  @Post()
  createLeaveRequest(@Body() data: LeaveRequest) {
    return this.employeeService.createLeaveRequest(data);
  }

  @Get()
  getAllLeaveRequests() {
    return this.employeeService.getAllLeaveRequests();
  }

  @Get(':id')
  getLeaveRequestById(@Param('id') id: number) {
    return this.employeeService.getLeaveRequestById(+id);
  }

  @Put(':id')
  updateLeaveRequest(@Param('id') id: number, @Body() data: LeaveRequest) {
    return this.employeeService.updateLeaveRequest(+id, data);
  }

  @Delete(':id')
  deleteLeaveRequest(@Param('id') id: number) {
    return this.employeeService.deleteLeaveRequest(+id);
  }
}
