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

  getAllEmployessFullnameAsc() {
    return this.prisma.employee.findMany({orderBy: [
      {fullname: 'asc'},
      ] });
  }

  getEmployeeById(id: number) {
    return this.prisma.employee.findUnique({ where: { id } });
  }

  updateEmployee(id: number, data: Employee) {
    return this.prisma.employee.update({ where: { id }, data });
  }

  deactivateEmployee(id: number) {
    return this.prisma.employee.update({
      where: { id },
      data: { status: 'inactive' },
    });
  }
  deleteEmployee(id: number) {
    return this.prisma.employee.delete({ where: { id } });
  }
}
