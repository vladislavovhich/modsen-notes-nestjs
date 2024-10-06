import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtConfig } from 'src/config/config.types';
import { PayloadType } from './auth.types';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    private readonly secret: string
    private readonly expiresIn: string

    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) {
        const {secret, expiresIn} = this.configService.get<JwtConfig>('jwt')

        this.secret = secret
        this.expiresIn = expiresIn
    }

    async signInOauth(payload: PayloadType) {
        const userFound = await this.userService.findByUsername(payload.username)

        if (!userFound) {
            const password = await bcrypt.hash(Date.now.toString(), 10)
            const user = await this.userService.create({username: payload.username, password})

            return this.getToken({username: user.username, sub: user._id.toString()})
        }

        return this.getToken({username: userFound.username, sub: userFound._id.toString()})
    }

    async signUp(data: CreateUserDto) {
        const userFound = await this.userService.findByUsername(data.username)

        if (userFound) {
            throw new BadRequestException("There is user with this login data")
        }

        data.password = await bcrypt.hash(data.password, 10)

        const user = await this.userService.create(data)

        return this.getToken({username: user.username, sub: user._id.toString()})
    }

    async signIn(data: CreateUserDto) {
        const userFound = await this.userService.findByUsername(data.username)

        if (!userFound) {
            throw new BadRequestException("Incorrect login or password")
        }

        const passwordVerify = await bcrypt.compare(data.password, userFound.password)

        if (!passwordVerify) {
            throw new BadRequestException("Incorrect login or password.")
        }

        return this.getToken({username: userFound.username, sub: userFound._id.toString()})
    }

    getToken(payload: PayloadType) {
        const token = this.jwtService.sign(payload, {secret: this.secret, expiresIn: this.expiresIn})

        return token
    }
}
