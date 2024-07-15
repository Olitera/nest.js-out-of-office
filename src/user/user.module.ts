import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from '../services/prisma/prisma.service';
import { EmployeeModule } from '../employee/employee.module';

@Module({
  imports: [EmployeeModule],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
