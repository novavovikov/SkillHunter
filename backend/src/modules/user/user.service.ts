import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from './user.entity'
import { UserDto } from './user.dto'

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async showAll () {
    return await this.userRepository.find()
  }

  async create (data: UserDto) {
    const user = this.userRepository.create(data)
    await this.userRepository.save(user)
    return user
  }

  async read (id: string) {
    const user = await this.userRepository.findOne({ where: { id } })
    return user
  }

  async update (id: number, data: Partial<UserDto>) {
    await this.userRepository.update({ id }, data)
    return await this.userRepository.findOne({ id })
  }

  async delete (id: number) {
    await this.userRepository.delete({ id })
    return { deleted: true }
  }

  async findById (id: number) {
    return await this.userRepository.findOne({ id })
  }

  async findByEmail (userDto: UserDto) {
    return await this.userRepository.findOne(userDto)
  }

  async findByPayload (payload: any) {
    const { email } = payload
    return await this.userRepository.findOne({ email })
  }
}
