import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from '@prisma/client';
import { RolesGuard } from '../services/guards/roles.guard';

@Controller('projects')
@UseGuards(RolesGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @SetMetadata('roles', ['PROJECT_MANAGER', 'ADMIN'])
  createProject(@Body() data: Project) {
    return this.projectService.createProject(data);
  }

  @Get()
  @SetMetadata('roles', ['PROJECT_MANAGER', 'HR_MANAGER', 'ADMIN'])
  getAllProjects() {
    return this.projectService.getAllProjects();
  }

  @Get(':id')
  @SetMetadata('roles', ['PROJECT_MANAGER', 'HR_MANAGER', 'ADMIN'])
  getProjectById(@Param('id') id: number) {
    return this.projectService.getProjectById(+id);
  }

  @Put(':id')
  @SetMetadata('roles', ['PROJECT_MANAGER', 'ADMIN'])
  updateProject(@Param('id') id: number, @Body() data: Project) {
    return this.projectService.updateProject(+id, data);
  }

  @Delete(':id')
  @SetMetadata('roles', ['PROJECT_MANAGER', 'ADMIN'])
  deleteProject(@Param('id') id: number) {
    return this.projectService.deleteProject(+id);
  }
}
