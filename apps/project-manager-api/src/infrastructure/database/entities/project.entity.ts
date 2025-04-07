
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IProject } from '../../../domain/interfaces/project.interface';
import { IUser } from '../../../domain/interfaces/user.interface';
import { TaskEntity } from '../../../../../tasks/src/infrastructure/entities/task.entity';
import { UserEntity } from './user.entity';
import { ITask } from '@tasks/domain/interfaces/task.interface';

@Entity('project')
export class ProjectEntity implements IProject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'description', nullable: false })
  description: string;
  
  @OneToMany(() => TaskEntity, (task) => task.project)
  tasks: ITask[];
  
  @ManyToOne(() => UserEntity, (user) => user.projects)
  @JoinColumn()
  user: IUser;
}
