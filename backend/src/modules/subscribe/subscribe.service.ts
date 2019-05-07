import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SubscribeDto } from './subscribe.dto'

import { SubscribeEntity } from './subscribe.entity'

@Injectable()
export class SubscribeService {
  constructor (
    @InjectRepository(SubscribeEntity)
    private subscribeRepository: Repository<SubscribeEntity>,
  ) {}

  async create (data: SubscribeDto) {
    const subscriber = this.subscribeRepository.create(data)
    await this.subscribeRepository.save(subscriber)
    return subscriber
  }

  async findByEmail (email: string) {
    return await this.subscribeRepository.findOne({ where: { email } })
  }
}
