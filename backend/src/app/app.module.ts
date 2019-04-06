import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from '../user/user.module'
import { SubscribeModule } from '../subscribe/subscribe.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    SubscribeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
