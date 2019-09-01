import { Injectable } from '@nestjs/common'
import { sign, SignOptions } from 'jsonwebtoken'
import { JWT_STRATEGY } from './constants/auth'
import { JwtPayloadDto } from './Jwt-payload.dto'

@Injectable()
export class AuthService {
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
