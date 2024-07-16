import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApprovalRequestService } from './approval-request.service';
import { ApprovalRequest } from '@prisma/client';
import { RolesGuard } from '../services/guards/roles.guard';

@Controller('approvalrequests')
@UseGuards(RolesGuard)
export class ApprovalRequestController {
  constructor(private readonly employeeService: ApprovalRequestService) {}

  @Post()
  @SetMetadata('roles', ['EMPLOYEE', 'ADMIN'])
  createApprovalRequest(@Body() data: ApprovalRequest) {
    return this.employeeService.createApprovalRequest(data);
  }

  @Get()
  @SetMetadata('roles', ['HR_MANAGER', 'PROJECT_MANAGER', 'ADMIN'])
  getAllApprovalRequests() {
    return this.employeeService.getAllApprovalRequests();
  }

  @Get(':id')
  @SetMetadata('roles', ['HR_MANAGER', 'PROJECT_MANAGER', 'ADMIN'])
  getApprovalRequestById(@Param('id') id: number) {
    return this.employeeService.getApprovalRequestById(+id);
  }

  @Put(':id')
  @SetMetadata('roles', ['HR_MANAGER', 'PROJECT_MANAGER', 'ADMIN'])
  updateApprovalRequest(
    @Param('id') id: number,
    @Body() data: ApprovalRequest,
  ) {
    return this.employeeService.updateApprovalRequest(+id, data);
  }

  @Delete(':id')
  @SetMetadata('roles', ['ADMIN'])
  deleteApprovalRequest(@Param('id') id: number) {
    return this.employeeService.deleteApprovalRequest(+id);
  }
}
