import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SubscribeEntity } from '../../entities/subscribe.entity'
import { SubscribeController } from './subscribe.controller'
import { SubscribeService } from './subscribe.service'

@Module({
  imports: [TypeOrmModule.forFeature([SubscribeEntity])],
  controllers: [SubscribeController],
  providers: [SubscribeService],
})
export class SubscribeModule {}
