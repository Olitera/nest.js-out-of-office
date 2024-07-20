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
import { EmployeeService } from './employee.service';
import { Employee, User } from '@prisma/client';
import { RolesGuard } from '../services/guards/roles.guard';

@Controller('employees')
@UseGuards(RolesGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @SetMetadata('roles', ['HR_MANAGER', 'ADMIN'])
  createEmployee(@Body() data: Employee & User & { hrId: number }) {
    return this.employeeService.createEmployee(data);
  }

  @Get()
  @SetMetadata('roles', ['HR_MANAGER', 'PROJECT_MANAGER', 'ADMIN'])
  getAllEmployees(
    @Query('sortColumn') sortColumn?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    @Query('filter') filter?: string[],
    @Query('search') search?: string,
  ) {
    return this.employeeService.getAllEmployees({
      sortColumn,
      sortOrder,
      filter,
      search,
    });
  }

  @Get(':id')
  @SetMetadata('roles', ['HR_MANAGER', 'PROJECT_MANAGER', 'ADMIN'])
  getEmployeeById(@Param('id') id: number) {
    return this.employeeService.getEmployeeById(+id);
  }

  @Put(':id')
  @SetMetadata('roles', ['HR_MANAGER', 'ADMIN'])
  updateEmployee(@Param('id') id: number, @Body() data: Employee) {
    return this.employeeService.updateEmployee(+id, data);
  }

  @Put(':id/status')
  @SetMetadata('roles', ['HR_MANAGER', 'ADMIN'])
  changeEmployeeStatus(
    @Param('id') id: number,
    @Query('status') status: string,
  ) {
    return this.employeeService.changeStatusEmployee(+id, status);
  }

  @Put(':id/assign-to-project')
  @SetMetadata('roles', ['PROJECT_MANAGER', 'ADMIN'])
  assignEmployeeToProject(
    @Param('id') id: number,
    @Body() projectId: { id: number },
  ) {
    return this.employeeService.assignEmployeeToProject(+id, projectId.id);
  }

  @Delete(':id')
  @SetMetadata('roles', ['ADMIN'])
  deleteEmployee(@Param('id') id: number) {
    return this.employeeService.deleteEmployee(+id);
  }
}
