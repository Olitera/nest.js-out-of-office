import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma/prisma.service';
import {Project } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  createProject(data: Project) {
    return this.prisma.project.create({ data });
  }
  getAllProjects() {
    return this.prisma.project.findMany();
  }

  getProjectById(id: number) {
    return this.prisma.project.findUnique({ where: { id } });
  }

  updateProject(id: number, data: Project) {
    return this.prisma.project.update({ where: { id }, data });
  }
  deleteProject(id: number) {
    return this.prisma.project.delete({ where: { id } });
  }
}
