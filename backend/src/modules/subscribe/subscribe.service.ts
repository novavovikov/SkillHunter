import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SubscribeDto } from './subscribe.dto'

import { Subscribe } from './subscribe.entity'

@Injectable()
export class SubscribeService {
  constructor (
    @InjectRepository(Subscribe)
    private subscribeRepository: Repository<Subscribe>,
  ) {}

  findAll () {
    return this.subscribeRepository.find({
      order: {
        id: 'ASC',
      },
    })
  }

  async create (data: SubscribeDto) {
    const subscriber = this.subscribeRepository.create(data)
    await this.subscribeRepository.save(subscriber)
    return subscriber
  }

  async findByEmail (email: string) {
    return await this.subscribeRepository.findOne({ where: { email } })
  }
}
