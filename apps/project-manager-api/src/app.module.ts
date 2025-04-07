import { Module } from '@nestjs/common';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { GatewaysModule } from './gateways/gateways.module';
import { AuthGuardService } from './gateways/guards/auth-guard.service';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ DomainModule, InfrastructureModule, GatewaysModule],
  providers: [{
      provide: APP_GUARD,
      useClass: AuthGuardService,
    }],
})
export class AppModule {}
