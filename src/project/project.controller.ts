import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from '@prisma/client';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  createProject(@Body() data: Project) {
    return this.projectService.createProject(data);
  }

  @Get()
  getAllProjects() {
    return this.projectService.getAllProjects();
  }

  @Get(':id')
  getProjectById(@Param('id') id: number) {
    return this.projectService.getProjectById(+id);
  }

  @Put(':id')
  updateProject(@Param('id') id: number, @Body() data: Project) {
    return this.projectService.updateProject(+id, data);
  }

  @Delete(':id')
  deleteProject(@Param('id') id: number) {
    return this.projectService.deleteProject(+id);
  }
}
