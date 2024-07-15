import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, SetMetadata, UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from '@prisma/client';
import { RolesGuard } from '../services/guards/roles.guard';

@Controller('employees')
@UseGuards(RolesGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @SetMetadata('roles', ['HR_MANAGER'])
  createEmployee(@Body() data: Employee) {
    return this.employeeService.createEmployee(data);
  }

  @Get()
  @SetMetadata('roles', ['HR_MANAGER', 'PROJECT_MANAGER'])
  getAllEmployees() {
    return this.employeeService.getAllEmployees();
  }

  @Get(':id')
  @SetMetadata('roles', ['HR_MANAGER', 'PROJECT_MANAGER'])
  getEmployeeById(@Param('id') id: number) {
    return this.employeeService.getEmployeeById(+id);
  }

  @Put(':id')
  @SetMetadata('roles', ['HR_MANAGER'])
  updateEmployee(@Param('id') id: number, @Body() data: Employee) {
    return this.employeeService.updateEmployee(+id, data);
  }

  @Delete(':id')
  @SetMetadata('roles', ['HR_MANAGER'])
  deleteEmployee(@Param('id') id: number) {
    return this.employeeService.deleteEmployee(+id);
  }
}
