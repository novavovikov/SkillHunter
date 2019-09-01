import { Injectable } from '@nestjs/common'
import { sign, SignOptions, verify } from 'jsonwebtoken'
import { JWT_STRATEGY } from './constants/auth'
import { JwtPayloadDto } from './Jwt-payload.dto'

@Injectable()
export class AuthService {
  static verifyToken (token: string) {
    try {
      return verify(token, JWT_STRATEGY.secretOrKey)
    } catch (e) {
      return null
    }
  }

  static signPayload (
    payload: JwtPayloadDto,
    options: SignOptions = {},
  ) {
    return sign(
      payload,
      JWT_STRATEGY.secretOrKey,
      {
        expiresIn: JWT_STRATEGY.expiresIn,
        ...options,
      },
    )
  }
}
