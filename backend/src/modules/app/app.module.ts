import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import config from '../../../ormconfig'
import { AuthModule } from '../auth/auth.module'
import { ResourceModule } from '../resource/resource.module'
import { SkillModule } from '../skill/skill.module'
import { SubscribeModule } from '../subscribe/subscribe.module'
import { SuggestsModule } from '../suggests/suggests.module'
import { UserResourceModule } from '../user-resource/user-resource.module'
import { UserSkillModule } from '../user-skill/user-skill.module'
import { UserModule } from '../user/user.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    SubscribeModule,
    AuthModule,
    SuggestsModule,
    UserModule,
    UserSkillModule,
    UserResourceModule,
    SkillModule,
    ResourceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
