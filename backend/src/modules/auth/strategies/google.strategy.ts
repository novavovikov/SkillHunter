import { Injectable, Req } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-google-oauth20'
import { GOOGLE_CALLBACK_URL, GOOGLE_SCOPES } from '../constants/google'
import { UserService } from '../../user/user.service'
import { AuthService } from '../auth.service'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor (
    private userService: UserService,
    private authService: AuthService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
      scope: GOOGLE_SCOPES,
    })
  }

  async validate (
    @Req() req,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done,
  ) {
    const { email, locale, picture } = profile._json
    let user = await this.userService.findByEmail({ email })

    if (!user && email) {
      user = await this.userService.create({
        email,
        locale,
        picture,
      })
    }

    const token = await this.authService.signPayload({ email: user.email })

    done(null, { ...user, token })
  }
}
