import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt'
import { AuthService } from '../auth.service'
import { JWT_STRATEGY } from '../constants/auth'

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor (private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_STRATEGY.secretOrKey,
    })
  }

  async validate (payload: any, done: VerifiedCallback) {
    const user = await this.authService.validateUser(payload)

    if (!user) {
      return done(
        new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED),
        false,
      )
    }

    return done(null, user, payload.iat)
  }
}
