import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '../base-use-case';
import { TasksRepositoryService } from '../../../infrastructure/database/repositories/tasks.repository.service';
import { UsersRepositoryService } from '../../../infrastructure/database/repositories/users.repository.service';
import { ITask } from '../../interfaces/task.interface';

@Injectable()
export class GetTaskByIdService implements BaseUseCase {
    constructor(
        private readonly usersRepository: UsersRepositoryService,
        private readonly tasksRepository: TasksRepositoryService,
    ) {}

    async execute(payload: {
        taskId: number;
        userId: number;
    }): Promise<ITask> {
        const userData = await this.usersRepository.findById(payload.userId);
        if (!userData) {
            throw new Error('Usuário não encontrado');
        }
        const taskData = await this.tasksRepository.findById(payload.taskId);
        if (!taskData) {
            throw new Error('Tarefa não encontrada');
        }
        return taskData;
    }
}
