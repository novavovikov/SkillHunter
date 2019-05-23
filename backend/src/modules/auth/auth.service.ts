import { Injectable } from '@nestjs/common'
import { sign } from 'jsonwebtoken'
import { UserService } from '../user/user.service'
import { JWT_STRATEGY } from './constants/auth'

@Injectable()
export class AuthService {
  constructor (private userService: UserService) {}

  async signPayload (payload: any) {
    return sign(
      payload,
      JWT_STRATEGY.secretOrKey,
      {
        expiresIn: JWT_STRATEGY.expiresIn,
      },
    )
  }

  async validateUser (payload: any) {
    return await this.userService.findByPayload(payload)
  }
}
