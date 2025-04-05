
import { IUser } from './user.interface';
import { ITask } from './task.interface';

export class IProject {
  id: number;
  name: string;
  description: string;
  tasks: ITask[];
  user: IUser;
}
