import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-facebook'
import { UserService } from '../../user/user.service'
import { AuthService } from '../auth.service'
import { FACEBOOK_STRATEGY } from '../constants/auth'
import { MailService } from '../../mail/mail.service'

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
  constructor (
    private userService: UserService,
    private mailService: MailService,
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
    let user = null
    const { email } = profile._json

    if (email) {
      user = await this.userService.findByAuthData({ email }, { facebookId: profile.id })
    }

    if (!user) {
      user = await this.userService.findByAuthData({ facebookId: profile.id })
    }

    if (!user) {
      const picture = Array.isArray(profile.photos) && profile.photos.length && profile.photos[0].value

      user = await this.userService.create({
        email,
        picture,
        facebookId: profile.id,
        name: profile.displayName,
      })

      this.mailService.send({
        to: 'novavovikov@gmail.com',
        subject: 'Registration',
        template: 'registration',
        context: user,
      })
    }

    const token = AuthService.signPayload({ id: user.id, facebookId: user.facebookId })

    done(null, { ...user, token })
  }
}
