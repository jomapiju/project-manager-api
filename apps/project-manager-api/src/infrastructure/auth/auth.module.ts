import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@project-manager-api/domain/use-cases/users/users.module';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60m' },
        }),
    ],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
