import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '../base-use-case';
import { UsersRepositoryService } from '../../../infrastructure/database/repositories/users.repository.service';
import { TasksRepositoryService } from '../../../infrastructure/database/repositories/tasks.repository.service';
import { ProjectsRepositoryService } from '../../../infrastructure/database/repositories/projects.repository.service';
import { ITask } from '../../interfaces/task.interface';
import { CreateTaskDto } from '../../../gateways/controllers/tasks/dtos/create-task.dto';

@Injectable()
export class CreateTaskService implements BaseUseCase {
    constructor(
    private readonly usersRepository: UsersRepositoryService,
    private readonly tasksRepository: TasksRepositoryService,
    private readonly projcetsRepository: ProjectsRepositoryService,
    ) {}

    async execute(payload: {
        task: CreateTaskDto;
        userId: number;
    }): Promise<ITask> {
        const userData = await this.usersRepository.findById(payload.userId);
        if (!userData) {
            throw new Error('Usuário não encontrado');
        }
        const projectData = await this.projcetsRepository.findById(payload.task.projectId);
        if (!projectData) {
            throw new Error('Projeto não encontrado');
        }
        const createdTask = await this.tasksRepository.add({
            name: payload.task.name,
            status: payload.task.status,
            project: projectData,
            user: { id: userData.id },
        });
        if (!createdTask) {
            throw new Error('Erro ao criar tarefa');
        }
        return createdTask;
    }
}
