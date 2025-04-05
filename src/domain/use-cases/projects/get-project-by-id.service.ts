import { Injectable } from '@nestjs/common';
import { UsersRepositoryService } from '../../../infrastructure/database/repositories/users.repository.service';
import { ProjectsRepositoryService } from '../../../infrastructure/database/repositories/projects.repository.service';
import { IProject } from '../../interfaces/project.interface';

@Injectable()
export class GetProjectByIdService {
    constructor(
        private readonly usersRepository: UsersRepositoryService,
        private readonly projectsRepository: ProjectsRepositoryService,
        ) {}

    async execute(payload: {
        userId: number;
        projectId: number;
        }): Promise<IProject> {
            const userData = await this.usersRepository.findById(payload.userId);
            if (!userData) {
                throw new Error('Usuário não encontrado');
            }
            const project = await this.projectsRepository.findById(payload.projectId);
            if (!project) {
                throw new Error('Erro ao recuperar projeto');
            }
            return project;
        }
}
