import { Injectable, Req } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-google-oauth20'
import { UserService } from '../../user/user.service'
import { AuthService } from '../auth.service'
import { GOOGLE_STRATEGY } from '../constants/auth'
import { MailService } from '../../mail/mail.service'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor (
    private userService: UserService,
    private mailService: MailService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      ...GOOGLE_STRATEGY,
    })
  }

  async validate (
    @Req() req,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done,
  ) {
    let user = null
    const { email, locale, picture } = profile._json

    if (email) {
      user = await this.userService.findByAuthData({ email }, { googleId: profile.id })
    }

    if (!user) {
      user = await this.userService.findByAuthData({ googleId: profile.id })
    }

    if (!user) {
      user = await this.userService.create({
        email,
        locale,
        picture,
        name: profile.displayName,
        googleId: profile.id,
      })

      this.mailService.send({
        to: 'novavovikov@gmail.com, smolinvalentin@gmail.com',
        subject: 'Registration',
        template: 'registration',
        context: user,
      })
    }

    const token = AuthService.signPayload({ id: user.id, googleId: user.googleId })

    done(null, { ...user, token })
  }
}
