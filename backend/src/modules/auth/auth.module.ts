import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../user/user.entity'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserService } from '../user/user.service'
import { GoogleStrategy } from './passport/google.strategy'
import { JWTStrategy } from './passport/jwt.strategy'
import { FacebookStrategy } from './passport/facebook.strategy'

@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserService,
    AuthService,
    JWTStrategy,
    GoogleStrategy,
    FacebookStrategy
  ]
})
export class AuthModule {}
