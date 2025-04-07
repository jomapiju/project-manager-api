import { Module } from '@nestjs/common';
import { ProjectsController } from './projects/projects.controller';
import { TasksController } from './tasks/tasks.controller';
import { UsersController } from './users/users.controller';
import { UseCasesModule } from '../../domain/use-cases/use-cases.module';
import { AuthModule } from '@project-manager-api/infrastructure/auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
    imports: [ClientsModule.register([
        {name: 'PROJECTS_MANAGER_API', transport: Transport.REDIS},
    ]), UseCasesModule, AuthModule],
    controllers: [ProjectsController, TasksController, UsersController, AuthController],
})
export class ControllersModule {}