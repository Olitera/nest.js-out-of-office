import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
  getAllProjects(
    @Query('sortColumn') sortColumn?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    @Query('filter') filter?: string[],
    @Query('search') search?: string,
  ) {
    return this.projectService.getAllProjects({
      sortColumn,
      sortOrder,
      filter,
      search,
    });
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

  @Put(':id/status')
  @SetMetadata('roles', ['PROJECT_MANAGER', 'ADMIN'])
  updateProjectStatus(
    @Param('id') id: number,
    @Query('status') status: string,
  ) {
    return this.projectService.changeStatusProject(+id, status);
  }

  @Delete(':id')
  @SetMetadata('roles', ['ADMIN'])
  deleteProject(@Param('id') id: number) {
    return this.projectService.deleteProject(+id);
  }
}
