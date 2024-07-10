import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { ApprovalRequestModule } from './approval-request/approval-request.module';
import { LeaveRequestModule } from './leave-request/leave-request.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [EmployeeModule, ApprovalRequestModule, LeaveRequestModule, ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
