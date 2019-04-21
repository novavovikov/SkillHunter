import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { sign } from 'jsonwebtoken'
import { JWT_EXPIRY_DATE, JWT_SECRET_KEY } from './constants/jwt'

@Injectable()
export class AuthService {
  constructor (private userService: UserService) {}

  async signPayload (payload: any) {
    return sign(payload, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRY_DATE,
    })
  }

  async validateUser (payload: any) {
    return await this.userService.findByPayload(payload)
  }
}
