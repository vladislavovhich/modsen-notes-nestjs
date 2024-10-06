import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GithubStrategy } from './strategy/github.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from 'src/config/config.types';
import { GoogleStrategy } from './strategy/google.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [AuthService, GithubStrategy, GoogleStrategy, JwtStrategy],
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const {expiresIn, secret} = configService.get<JwtConfig>('jwt')

        return {
          signOptions: { expiresIn: expiresIn },
          secret: secret,
        };
      },
      inject: [ConfigService],
    }),
    UserModule
  ],
  controllers: [AuthController],
})
export class AuthModule {}
