import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, Repository } from 'typeorm'

import { Subscribe } from './subscribe.entity'

@Injectable()
export class SubscribeService {
  constructor(
    @InjectRepository(Subscribe)
    private subscribeRepository: Repository<Subscribe>
  ) {}

  findAll() {
    return this.subscribeRepository.find({
      order: {
        id: 'ASC',
      },
    })
  }

  findOne (criteria: any, options?: FindOneOptions<Subscribe>) {
    return this.subscribeRepository.findOne({
      where: criteria,
      ...options,
    })
  }

  async create (data: Partial<Subscribe>) {
    const subscriber = this.subscribeRepository.create(data)
    await this.subscribeRepository.save(subscriber)
    return subscriber
  }

  async findByEmail(email: string) {
    return await this.subscribeRepository.findOne({ where: { email } })
  }
}
