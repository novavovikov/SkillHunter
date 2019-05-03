import { Injectable, Req } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-google-oauth20'
import { GOOGLE_STRATEGY } from '../constants/auth'
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
      ...GOOGLE_STRATEGY
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
    let user = await this.userService.findByAuthData({
      googleId: profile.id,
      email
    })

    if (!user && email) {
      user = await this.userService.create({
        email,
        locale,
        picture,
        name: profile.displayName,
        googleId: profile.id
      })
    }

    const token = await this.authService.signPayload({ email: user.email })

    done(null, { ...user, token })
  }
}
