import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserModule } from '../user/user.module'
import { UserService } from '../user/user.service'
import { GoogleStrategy } from './passport/google.strategy'
import { JWTStrategy } from './passport/jwt.strategy'
import { FacebookStrategy } from './passport/facebook.strategy'

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
  ],
  providers: [
    UserService,
    AuthService,
    JWTStrategy,
    GoogleStrategy,
    FacebookStrategy
  ]
})
export class AuthModule {}
