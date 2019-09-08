import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { ResourceModule } from '../resource/resource.module'
import { SkillModule } from '../skill/skill.module'
import { SkillsetModule } from '../skillset/skillset.module'
import { SubscribeModule } from '../subscribe/subscribe.module'
import { SuggestsModule } from '../suggests/suggests.module'
import { TelegramModule } from '../telegram/telegram.module'
import { UserResourceModule } from '../user-resource/user-resource.module'
import { UserSkillModule } from '../user-skill/user-skill.module'
import { UserModule } from '../user/user.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CacheModule } from '../cache'
import config from '../../../ormconfig'

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    SubscribeModule,
    AuthModule,
    SuggestsModule,
    UserModule,
    SkillsetModule,
    UserSkillModule,
    UserResourceModule,
    SkillModule,
    ResourceModule,
    CacheModule,
    TelegramModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
