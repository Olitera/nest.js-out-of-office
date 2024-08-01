import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma/prisma.service';
import { Project } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  createProject(data: Project) {
    return this.prisma.project.create({ data });
  }
  getAllProjects(args?: {
    sortColumn?: string;
    sortOrder?: 'asc' | 'desc';
    filter?: string[];
    search?: string;
  }) {
    const where = args?.search ? { id: +args.search } : undefined;
    return this.prisma.project.findMany({
      orderBy: [{ [args?.sortColumn ?? 'id']: args?.sortOrder ?? 'asc' }],
      select: {
        id: true,
        projectType: args?.filter?.includes('projectType'),
        startDate: args?.filter?.includes('startDate'),
        endDate: args?.filter?.includes('endDate'),
        projectManager: args?.filter?.includes('projectManager'),
        comment: args?.filter?.includes('comment'),
        status: args?.filter?.includes('status'),
      },
      where,
    });
  }

  getProjectById(id: number) {
    return this.prisma.project.findUnique({ where: { id } });
  }

  updateProject(id: number, data: Project) {
    return this.prisma.project.update({ where: { id }, data });
  }

  changeStatusProject(id: number, estatus: string) {
    const status = estatus === 'inactive' ? 'inactive' : 'active';
    return this.prisma.project.update({
      where: { id },
      data: { status },
    });
  }
  deleteProject(id: number) {
    return this.prisma.project.delete({ where: { id } });
  }
}
