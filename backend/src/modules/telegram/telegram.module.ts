import { CacheModule, HttpModule, Module } from '@nestjs/common'
import { TelegramController } from './telegram.controller'
import { TelegramService } from './telegram.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../user/user.entity'
import { UserService } from '../user/user.service'
import { AuthService } from '../auth/auth.service'
import { UserSkill } from '../user-skill/user-skill.entity'
import { UserSkillService } from '../user-skill/user-skill.service'
import { UserResourceService } from '../user-resource/user-resource.service'
import { ResourceService } from '../resource/resource.service'
import { UserResource } from '../user-resource/user-resource.entity'
import { Resource } from '../resource/resource.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserSkill,
      UserResource,
      Resource
    ]),
    HttpModule.register({
      timeout: 6000,
    }),
    CacheModule.register({
      ttl: 120, // seconds
      max: 10, // maximum number of items in cache
    }),
  ],
  controllers: [TelegramController],
  providers: [
    TelegramService,
    AuthService,
    UserService,
    UserSkillService,
    UserResourceService,
    ResourceService,
  ],
})
export class TelegramModule {}
