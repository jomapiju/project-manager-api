import { Injectable } from '@nestjs/common';
import { UpdateTaskDto } from '@tasks/gateways/controllers/dtos/update-task.dto';
import { ITask } from '../interfaces/task.interface';
import { TasksRepositoryService } from '@tasks/infrastructure/repositories/tasks.repository.service';

@Injectable()
export class UpdateTaskService {
  constructor(private readonly tasksRepository: TasksRepositoryService) {}

  async execute(task: UpdateTaskDto, userId: number): Promise<ITask> {
    await this.tasksRepository.updateById(task);
    const taskData = await this.tasksRepository.findById(task.id, userId);

    return taskData;
  }
}
