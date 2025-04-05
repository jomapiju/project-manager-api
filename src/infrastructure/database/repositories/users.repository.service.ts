import { Injectable } from '@nestjs/common';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { IUser } from '../../../domain/interfaces/user.interface';
import { UserEntity } from '../entities/user.entity';
import { IUsersRepository } from '../../../domain/repositories/users-repository.interface';

@Injectable()
export class UsersRepositoryService
  extends Repository<UserEntity>
  implements IUsersRepository
{
  constructor(dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
  findById(id: number): Promise<IUser> {
    return <Promise<IUser>> this.findOneBy({ id });
  }
  add(payload: DeepPartial<IUser>): Promise<IUser> {
    return this.save(payload) as Promise<IUser>;
  }
}
