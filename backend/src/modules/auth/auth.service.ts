import { Injectable } from '@nestjs/common'
import { sign } from 'jsonwebtoken'
import { UserService } from '../user/user.service'
import { JWT_STRATEGY } from './constants/auth'
import { JwtPayloadDto } from './Jwt-payload.dto'

@Injectable()
export class AuthService {
  signPayload (payload: JwtPayloadDto) {
    return sign(
      payload,
      JWT_STRATEGY.secretOrKey,
      {
        expiresIn: JWT_STRATEGY.expiresIn,
      },
    )
  }

  validateUser (payload: JwtPayloadDto) {
    return this.userService.findByPayload(payload)
  }
}
