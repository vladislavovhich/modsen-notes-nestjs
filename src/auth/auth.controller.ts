import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { JwtConfig } from 'src/config/config.types';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiExcludeController(true)
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Get('github')
    @UseGuards(AuthGuard('github'))
    githubAuth() {}

    @Get('google')
    @UseGuards(AuthGuard('google'))
    auth() {}

    @Get('github-callback')
    @UseGuards(AuthGuard('github'))
    async githubCallback(@Res({ passthrough: true }) response: Response, @Req() req) {
        const token = this.authService.getToken({sub: req.user.id, username: req.user.username})

        response.cookie("jwt", token, {httpOnly: true, secure: true})
        
        return "Ok!"
    }

    @Get('google-callback')
    @UseGuards(AuthGuard('google'))
    async googleCallback(@Res({ passthrough: true }) response: Response, @Req() req) {
        const token = this.authService.getToken({ sub: req.user.id, username: req.user.username })

        response.cookie("jwt", token, {httpOnly: true, secure: true})
        
        return "Ok!"
    }
}
