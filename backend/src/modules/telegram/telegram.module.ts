import { HttpModule, Module } from '@nestjs/common'
import { TelegramController } from './telegram.controller'
import { TelegramService } from './telegram.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../user/user.entity'
import { UserService } from '../user/user.service'
import { AuthService } from '../auth/auth.service'
import { UserSkill } from '../user-skill/user-skill.entity'
import { UserSkillService } from '../user-skill/user-skill.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserSkill
    ]),
    HttpModule.register({
      timeout: 6000,
    }),
  ],
  controllers: [TelegramController],
  providers: [
    TelegramService,
    AuthService,
    UserService,
    UserSkillService,
  ],
})
export class TelegramModule {}
