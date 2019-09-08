import * as redisStore from 'cache-manager-redis-store'
import { CacheModule, HttpModule, Module } from '@nestjs/common'
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
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST || 'redis',
      port: process.env.REDIS_PORT || 6379,
    }),
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
