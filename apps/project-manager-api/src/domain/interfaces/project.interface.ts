
import { ITask } from '@tasks/domain/interfaces/task.interface';
import { IUser } from './user.interface';

export class IProject {
  id: number;
  name: string;
  description: string;
  tasks: ITask[];
  user: IUser;
}
