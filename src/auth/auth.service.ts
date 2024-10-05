import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtConfig } from 'src/config/config.types';
import { PayloadType } from './auth.types';

@Injectable()
export class AuthService {
    private readonly secret: string
    private readonly expiresIn: string

    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {
        const {secret, expiresIn} = this.configService.get<JwtConfig>('jwt')

        this.secret = secret
        this.expiresIn = expiresIn
    }

    getToken(payload: PayloadType) {
        const token = this.jwtService.signAsync(payload, {secret: this.secret, expiresIn: this.expiresIn})

        return token
    }
}
