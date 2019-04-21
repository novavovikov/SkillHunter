import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserModule } from '../user/user.module'
import { UserService } from '../user/user.service'
import { GoogleStrategy } from './strategies/google.strategy'
import { JWTStrategy } from './strategies/jwt.strategy'

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
  ],
  providers: [
    UserService,
    AuthService,
    JWTStrategy,
    GoogleStrategy
  ]
})
export class AuthModule {}
