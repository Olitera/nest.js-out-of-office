import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from '@prisma/client';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  createEmployee(@Body() data: Employee) {
    return this.employeeService.createEmployee(data);
  }

  @Get()
  getAllEmployees() {
    return this.employeeService.getAllEmployees();
  }

  @Get(':id')
  getEmployeeById(@Param('id') id: number) {
    return this.employeeService.getEmployeeById(+id);
  }

  @Put(':id')
  updateEmployee(@Param('id') id: number, @Body() data: Employee) {
    return this.employeeService.updateEmployee(+id, data);
  }

  @Delete(':id')
  deleteEmployee(@Param('id') id: number) {
    return this.employeeService.deleteEmployee(+id);
  }


}
