import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApprovalRequestService } from './approval-request.service';
import { ApprovalRequest } from '@prisma/client';

@Controller('approvalrequests')
export class ApprovalRequestController {
  constructor(private readonly employeeService: ApprovalRequestService) {}

  @Post()
  createApprovalRequest(@Body() data: ApprovalRequest) {
    return this.employeeService.createApprovalRequest(data);
  }

  @Get()
  getAllApprovalRequests() {
    return this.employeeService.getAllApprovalRequests();
  }

  @Get(':id')
  getApprovalRequestById(@Param('id') id: number) {
    return this.employeeService.getApprovalRequestById(+id);
  }

  @Put(':id')
  updateApprovalRequest(
    @Param('id') id: number,
    @Body() data: ApprovalRequest,
  ) {
    return this.employeeService.updateApprovalRequest(+id, data);
  }

  @Delete(':id')
  deleteApprovalRequest(@Param('id') id: number) {
    return this.employeeService.deleteApprovalRequest(+id);
  }
}
