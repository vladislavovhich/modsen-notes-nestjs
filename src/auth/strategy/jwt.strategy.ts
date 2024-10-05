import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { extractTokenFromCookies } from "src/common/helpers/extract-jwt.helper";
import { JwtConfig } from "src/config/config.types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt')  {
    constructor(configService: ConfigService) {
      const secret = configService.get<JwtConfig>('jwt').secret
      
      super({
          jwtFromRequest: ExtractJwt.fromExtractors([extractTokenFromCookies("jwt")]),
          secretOrKey: secret
      });
    }

    async validate(payload: any) {
      return payload
    }
}