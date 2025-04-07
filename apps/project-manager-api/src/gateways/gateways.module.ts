import { Module } from '@nestjs/common';
import { ControllersModule } from './controllers/controllers.module';
import { AuthGuardService } from './guards/auth-guard.service';

@Module({
    imports: [ControllersModule],
    providers: [AuthGuardService],
    exports: [ControllersModule, AuthGuardService],
})
export class GatewaysModule {}
