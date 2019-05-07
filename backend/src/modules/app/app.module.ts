import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SkillModule } from '../skill/skill.module'
import { SuggestsModule } from '../suggests/suggests.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from '../user/user.module'
import { AuthModule } from '../auth/auth.module'
import { SubscribeModule } from '../subscribe/subscribe.module'
import config from '../../../ormconfig'

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UserModule,
    AuthModule,
    SubscribeModule,
    SuggestsModule,
    SkillModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
