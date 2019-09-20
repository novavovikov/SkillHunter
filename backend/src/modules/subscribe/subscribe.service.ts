import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm'

import { Subscribe } from './subscribe.entity'

@Injectable()
export class SubscribeService {
  constructor(
    @InjectRepository(Subscribe)
    private subscribeRepository: Repository<Subscribe>
  ) {}

  findAll(options: FindManyOptions<Subscribe> = {}) {
    return this.subscribeRepository.find(options)
  }

  findOne(criteria: any, options?: FindOneOptions<Subscribe>) {
    return this.subscribeRepository.findOne({
      where: criteria,
      ...options,
    })
  }

  async create(data: Partial<Subscribe>) {
    const subscriber = this.subscribeRepository.create(data)
    await this.subscribeRepository.save(subscriber)
    return subscriber
  }

  remove(subscribe: Subscribe) {
    return this.subscribeRepository.remove(subscribe)
  }
}
