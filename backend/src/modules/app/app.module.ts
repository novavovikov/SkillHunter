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
import { UserSettingsModule } from '../user-settings/user-settings.module'
import { UserSkillModule } from '../user-skill/user-skill.module'
import { UserModule } from '../user/user.module'
import { CacheModule } from '../cache/cache.module'
import { MailModule } from '../mail/mail.module'
import { AppService } from './app.service'
import { AppController } from './app.controller'
import config from '../../../ormconfig'

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    SubscribeModule,
    AuthModule,
    SuggestsModule,
    UserModule,
    UserSettingsModule,
    SkillsetModule,
    UserSkillModule,
    UserResourceModule,
    SkillModule,
    ResourceModule,
    CacheModule,
    TelegramModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
