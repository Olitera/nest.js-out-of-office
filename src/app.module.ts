import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { ApprovalRequestModule } from './approval-request/approval-request.module';
import { LeaveRequestModule } from './leave-request/leave-request.module';
import { ProjectModule } from './project/project.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleMiddleware } from './services/middleware/middleware.';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { RolesGuard } from './services/guards/roles.guard';
import { PrismaService } from './services/prisma/prisma.service';

@Module({
  imports: [
    EmployeeModule,
    ApprovalRequestModule,
    LeaveRequestModule,
    ProjectModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    Reflector,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RoleMiddleware)
      .exclude('/auth/signup', '/auth/login', '/auth/signup/hr', '/doc', '/')
      .forRoutes('*');
  }
}
