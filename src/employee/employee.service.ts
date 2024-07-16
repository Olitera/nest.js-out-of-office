import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma/prisma.service';
import { Employee } from '@prisma/client';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  createEmployee(data: Employee) {
    return this.prisma.employee.create({ data });
  }

  getAllEmployees(args?: {
    sortColumn?: string,
    sortOrder?: 'asc' | 'desc',
    filter?: string[],
    search?: string
  }) {
    return this.prisma.employee.findMany({
        orderBy: [
          { [args?.sortColumn ?? 'fullname']: args?.sortOrder ?? 'asc' },
        ],
        select: {
          id: true,
          fullname: args?.filter?.includes('fullname'),
          subdivision: args?.filter?.includes('subdivision'),
          status: args?.filter?.includes('status'),
          position: args?.filter?.includes('position'),
          peoplePartner: args?.filter?.includes('peoplePartner'),
          outOfOfficeBalance: args?.filter?.includes('outOfOfficeBalance'),
        },
      where: {
        fullname: {
          contains: args?.search,
        }
        }
      }
    );
  }

  getAllEmployeesFilter() {
    return this.prisma.employee.findMany({
      where: {
        status: 'active',
      }
    });
  }

  getEmployeeById(id: number) {
    return this.prisma.employee.findUnique({ where: { id } });
  }

  updateEmployee(id: number, data: Employee) {
    return this.prisma.employee.update({ where: { id }, data });
  }

  async changeStatusEmployee(id: number, estatus: string) {
    console.log(await this.prisma.employee.findUnique({ where: { id } }));
    const status = estatus === 'inactive' ? 'inactive' : 'active';
    return this.prisma.employee.update({
      where: { id },
      data: { status },
    });
  }

  deleteEmployee(id: number) {
    return this.prisma.employee.delete({ where: { id } });
  }
}
