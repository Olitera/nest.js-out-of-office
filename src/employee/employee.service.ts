import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma/prisma.service';
import { Employee } from '@prisma/client';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  createEmployee(data: Employee) {
    return this.prisma.employee.create({ data });
  }
  getAllEmployees() {
    return this.prisma.employee.findMany();
  }

  getEmployeeById(id: number) {
    return this.prisma.employee.findUnique({ where: { id } });
  }

  updateEmployee(id: number, data: Employee) {
    return this.prisma.employee.update({ where: { id }, data });
  }
  deleteEmployee(id: number) {
    return this.prisma.employee.delete({ where: { id } });
  }
}
