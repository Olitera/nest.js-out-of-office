import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { PrismaService } from '../services/prisma/prisma.service';
import { ProjectService } from './project.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, PrismaService],
})
export class ProjectModule {}
