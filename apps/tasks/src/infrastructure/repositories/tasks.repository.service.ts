
import { Injectable } from '@nestjs/common';
import { TaskEntity } from '../entities/task.entity';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { ITasksRepository } from '../../domain/repositories/tasks-repository.interface';
import { ITask } from '@tasks/domain/interfaces/task.interface';

@Injectable()
export class TasksRepositoryService
  extends Repository<TaskEntity>
  implements ITasksRepository
{
  constructor(dataSource: DataSource) {
    super(TaskEntity, dataSource.createEntityManager());
  }
  findAll(userId: number): Promise<ITask[]> {
    return this.findBy({ user: { id: userId } });
  }
  findById(id: number, userId: number): Promise<ITask> {
    return <Promise<ITask>> this.findOneByOrFail({ id, user: { id: userId } });
  }
  add(payload: DeepPartial<ITask>): Promise<ITask> {
    return this.save(payload) as Promise<ITask>;
  }
  updateById(payload: DeepPartial<ITask>) {
    return this.update(<number>payload.id, payload);
  }
}
