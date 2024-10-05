import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Console } from 'console';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { GoogleConfig } from 'src/config/config.types';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    const {clientId, clientSecret} = configService.get<GoogleConfig>('google')

    console.log(clientId, clientSecret)
    
    super({
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: 'http://localhost:3000/auth/google-callback',
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ) {
    const { name, emails, photos } = profile;

    const user = {
      id: profile.id,
      username: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}