import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { GatewaysModule } from './gateways/gateways.module';
import { DomainModule } from '@project-manager-api/domain/domain.module';
import { TasksService } from './tasks.service';

@Module({
  imports: [InfrastructureModule, GatewaysModule, DomainModule],
  providers: [TasksService],
})
export class TasksModule {}
