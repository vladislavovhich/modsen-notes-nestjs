import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { extractTokenFromCookies } from "src/common/helpers/extract-jwt.helper";
import { JwtConfig } from "src/config/config.types";
import { UserService } from "src/user/user.service";
import { PayloadType } from "../auth.types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt')  {
    constructor(
      configService: ConfigService, 
      private readonly userService: UserService
    ) {
      const secret = configService.get<JwtConfig>('jwt').secret
      
      super({
          jwtFromRequest: ExtractJwt.fromExtractors([extractTokenFromCookies("jwt")]),
          secretOrKey: secret
      });
    }

    async validate(payload: PayloadType) {
        const user = await this.userService.findByUsername(payload.username)

        if (!user) {
          throw new BadRequestException("No user specified")
        }

        return user
    }
}