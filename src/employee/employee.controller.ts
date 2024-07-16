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
import { EmployeeService } from './employee.service';
import { Employee } from '@prisma/client';
import { RolesGuard } from '../services/guards/roles.guard';

@Controller('employees')
@UseGuards(RolesGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @SetMetadata('roles', ['HR_MANAGER', 'ADMIN'])
  createEmployee(@Body() data: Employee) {
    return this.employeeService.createEmployee(data);
  }

  @Get()
  @SetMetadata('roles', ['HR_MANAGER', 'PROJECT_MANAGER', 'ADMIN'])
  getAllEmployees(
    @Query('sortColumn') sortColumn?: string,
    @Query('sortOrder') sortOrder?: ('asc' | 'desc'),
    @Query('filter') filter?: string[]
  ) {
    return this.employeeService.getAllEmployees({ sortColumn, sortOrder, filter });
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

  @Put(':id/deactivate')
  @SetMetadata('roles', ['HR_MANAGER', 'ADMIN'])
  deactivateEmployee(@Param('id') id: number) {
    return this.employeeService.deactivateEmployee(+id);
  }

  @Delete(':id')
  @SetMetadata('roles', ['ADMIN'])
  deleteEmployee(@Param('id') id: number) {
    return this.employeeService.deleteEmployee(+id);
  }
}
