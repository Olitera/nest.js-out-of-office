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
  Res,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from '@prisma/client';
import { RolesGuard } from '../services/guards/roles.guard';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

@Controller('projects')
@UseGuards(RolesGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @SetMetadata('roles', ['PROJECT_MANAGER', 'ADMIN'])
  createProject(
    @Body() data: Project,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (
      !data?.projectType ||
      !data?.startDate ||
      !data?.projectManager ||
      !data?.status
    ) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send('Required fields are not filled in');
      return;
    } else {
      return this.projectService.createProject(data);
    }
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
  async getProjectById(
    @Param('id') id: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    const project = await this.projectService.getProjectById(+id);
    if (!project) {
      res.status(StatusCodes.NOT_FOUND).send('Project not found');
      return;
    }
    return project;
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
