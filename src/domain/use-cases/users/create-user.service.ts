import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '../base-use-case';
import { CreateUserDto } from '../../../gateways/controllers/projects/dtos/create-user.dto';
import { IUser } from '../../interfaces/user.interface';
import { UsersRepositoryService } from '../../../infrastructure/database/repositories/users.repository.service';

@Injectable()
export class CreateUserService implements BaseUseCase {
    constructor(private readonly usersRepository: UsersRepositoryService) {}
    async execute(user: CreateUserDto): Promise<IUser> {
        const createdUser = await this.usersRepository.add(user);
        if (!createdUser) {
            throw new Error('Usuário não pôde ser criado');
        }
        return createdUser;
    }
}
