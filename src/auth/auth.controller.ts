import { Body, Controller, Get, HttpStatus, Post, Put, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiExcludeController, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { JwtConfig } from 'src/config/config.types';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { GetUser } from 'src/common/decorators/extract-user.decorator';
import { UserDocument } from 'src/user/schemas/user.schema';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @ApiExcludeEndpoint(true)
    @Get('github')
    @UseGuards(AuthGuard('github'))
    githubAuth() {}

    @ApiExcludeEndpoint(true)
    @Get('google')
    @UseGuards(AuthGuard('google'))
    auth() {}

    @ApiExcludeEndpoint(true)
    @Get('github-callback')
    @UseGuards(AuthGuard('github'))
    async githubCallback(@Res() response: Response, @Req() req) {
        const token = await this.authService.signInOauth(req.user)

        response.cookie("jwt", token, {httpOnly: true, secure: true})
        
        response.sendStatus(HttpStatus.OK)
    }

    @ApiExcludeEndpoint(true)
    @Get('google-callback')
    @UseGuards(AuthGuard('google'))
    async googleCallback(@Res() response: Response, @Req() req) {
        const token = await this.authService.signInOauth(req.user)

        response.cookie("jwt", token, {httpOnly: true, secure: true})
        
        response.sendStatus(HttpStatus.OK)
    }

    @Post('sign-in')
    async signIn(@Body() signInDto: CreateUserDto, @Res() response: Response) {
        const token = await this.authService.signIn(signInDto)

        response.cookie("jwt", token, {httpOnly: true, secure: true})
        
        response.sendStatus(HttpStatus.OK)
    }

    @Post('sign-up')
    async signUp(@Body() signInDto: CreateUserDto, @Res() response: Response) {
        const token = await this.authService.signUp(signInDto)

        response.cookie("jwt", token, {httpOnly: true, secure: true})
        
        response.sendStatus(HttpStatus.OK)
    }

    @Put('log-out')
    @UseGuards(AuthGuard('jwt'))
    signOut(@Res() response: Response) {
        response.clearCookie('jwt')

        response.sendStatus(200)
    }
}
