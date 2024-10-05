import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github';
import { GithubConfig } from 'src/config/config.types';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(configService: ConfigService) {
    const {clientId, clientSecret} = configService.get<GithubConfig>('github')

    super({
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: 'http://localhost:3000/auth/github-callback',
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    return profile;
  }
}