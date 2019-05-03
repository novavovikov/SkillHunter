import { HttpException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { SubscribeEntity } from '../../entities/subscribe.entity'
import { SubscribeDto } from './subscribe.dto'

@Injectable()
export class SubscribeService {
  constructor(
    @InjectRepository(SubscribeEntity)
    private subscribeRepository: Repository<SubscribeEntity>,
  ) {}

  async create(data: SubscribeDto) {
    const subscriber = this.subscribeRepository.create(data)
    await this.subscribeRepository.save(subscriber)
    return subscriber
  }

  async findByEmail(email: string) {
    return await this.subscribeRepository.findOne({ where: { email }})
  }
}
