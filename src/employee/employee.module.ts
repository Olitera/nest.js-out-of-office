import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { PrismaService } from '../services/prisma/prisma.service';
import { EmployeeService } from './employee.service';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, PrismaService],
})
export class EmployeeModule {}
