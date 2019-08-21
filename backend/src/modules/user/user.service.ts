import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, Repository } from 'typeorm'
import { unique } from '../../utils/unique'
import { Skillset } from '../skillset/skillset.entity'
import { UserDto } from './user.dto'
import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll () {
    return this.userRepository.find({
      order: {
        id: 'DESC',
      },
    })
  }

  async findById (id: number | string, options?: FindOneOptions<User>) {
    return await this.userRepository.findOne({
      where: {
        id: Number(id),
      },
      ...options,
    })
  }

  async create (data: UserDto) {
    const user = this.userRepository.create(data)
    await this.userRepository.save(user)
    return user
  }

  async update (id: number, data: UserDto) {
    await this.userRepository.update({ id }, data)
    return await this.userRepository.findOne({ id })
  }

  async delete (id: number) {
    await this.userRepository.delete({ id })
    return { deleted: true }
  }

  async findByAuthData (searchData: UserDto, userData: UserDto = {}) {
    const user = await this.userRepository.findOne(searchData)

    if (!user) {
      return null
    }

    if (userData.facebookId && !user.facebookId) {
      user.facebookId = userData.facebookId
      this.userRepository.update({ id: user.id }, user)
    }

    if (userData.googleId && !user.googleId) {
      user.googleId = userData.googleId
      this.userRepository.update({ id: user.id }, user)
    }

    return user
  }

  findByPayload (payload: any) {
    const { id, googleId, facebookId } = payload

    if (googleId) {
      return this.userRepository.findOne({ id, googleId })
    }

    return this.userRepository.findOne({ id, facebookId })
  }

  addSkillset (
    user: User,
    skillset: Skillset
  ) {
    user.skillsets = unique([...user.skillsets, skillset])
    return this.userRepository.save(user)
  }

  async removeSkillset (userId: number, skillsetId: number) {
    const user = await this.findById(userId, {
      relations: ['skillsets'],
    })

    user.skillsets = user.skillsets.filter(({ id }) => id !== skillsetId)
    return await this.userRepository.save(user)
  }
}
