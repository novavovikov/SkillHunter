import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, Repository } from 'typeorm'
import { UserSettings } from './user-settings.entity'
import { User } from '../user/user.entity'

@Injectable()
export class UserSettingsService {
  constructor(
    @InjectRepository(UserSettings)
    private userSettingsRepository: Repository<UserSettings>
  ) {}

  async findByUser(user: User, options?: FindOneOptions<UserSettings>) {
    return this.userSettingsRepository.findOne({ user }, options)
  }

  async update(user: User, data: any) {
    await this.userSettingsRepository.update({ user }, data)
    return await this.userSettingsRepository.findOne({ user })
  }

  async delete(user: User, options?: FindOneOptions<UserSettings>) {
    await this.userSettingsRepository.delete({ user })
    return { deleted: true }
  }
}
