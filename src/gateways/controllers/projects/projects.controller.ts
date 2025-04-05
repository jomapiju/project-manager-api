import { Body, Controller, Get, NotFoundException, Param, Post, UnprocessableEntityException } from '@nestjs/common';
import { CreateProjectDto } from './dtos/create-project.dto';
import { CreateProjectService } from '../../../domain/use-cases/projects/create-project.service';
import { GetAllProjectsService } from '../../../domain/use-cases/projects/get-all-projects.service';
import { GetProjectByIdService } from '../../../domain/use-cases/projects/get-project-by-id.service';

const userId = 1;

@Controller('projects')
export class ProjectsController {
    constructor(
        private readonly getAllProjectsUseCase: GetAllProjectsService,
        private readonly getProjectByIdUseCase: GetProjectByIdService,
        private readonly createProjectUseCase: CreateProjectService,
        ) {}
    
    @Get()
    async findAll() {
        try {   
            return this.getAllProjectsUseCase.execute(userId);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        try {
            return await this.getProjectByIdUseCase.execute({
                userId,
                projectId: id,
            });
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Post()
    async create(@Body() createProjectDto: CreateProjectDto) {
        try {
            return await this.createProjectUseCase.execute({
                userId,
                project: createProjectDto,
            });
        } catch (error) {
            throw new UnprocessableEntityException(error.message);
        }
    }
}
