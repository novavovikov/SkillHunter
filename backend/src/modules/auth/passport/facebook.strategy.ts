import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-facebook'
import { FACEBOOK_STRATEGY } from '../constants/auth'
import { UserService } from '../../user/user.service'
import { AuthService } from '../auth.service'

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
  constructor (
    private userService: UserService,
    private authService: AuthService,
  ) {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      ...FACEBOOK_STRATEGY,
    })
  }

  async validate (
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ) {
    const { email } = profile._json
    let user = await this.userService.findByAuthData({
      facebookId: profile.id,
      email,
    })

    if (!user && email) {
      user = await this.userService.create({
        email,
        facebookId: profile.id,
        name: profile.displayName,
      })
    }

    const token = await this.authService.signPayload({ email: user.email })

    done(null, { ...user, token })
  }
}
