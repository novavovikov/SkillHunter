import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from '../user/user.module'
import { SubscribeModule } from '../subscribe/subscribe.module'

const connectionUrl: string = process.env.DB_CONNECTION
console.log(connectionUrl)

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: connectionUrl,
      entities: [`${__dirname}/../**/*.entity{.ts,.js}`]
    }),
    UserModule,
    SubscribeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
