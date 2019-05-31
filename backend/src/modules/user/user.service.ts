import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, Repository } from 'typeorm'
import { unique } from '../../utils/unique'
import { Profession } from '../profession/profession.entity'
import { Resource } from '../resource/resource.entity'
import { Skill } from '../skill/skill.entity'
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
        id: 'ASC',
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

  async findByAuthData (userData: UserDto) {
    const user = await this.userRepository.findOne({
      email: userData.email,
    })

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

  async findByPayload (payload: any) {
    const { email } = payload
    return await this.userRepository.findOne({ email })
  }

  async setSkills (userId: number | string, skills: Skill[]) {
    const user = await this.findById(userId, {
      relations: ['skills']
    })

    user.skills = skills
    return await this.userRepository.save(user)
  }

  async addProfession (userId: number | string, profession: Profession) {
    const user = await this.findById(userId, {
      relations: ['professions']
    })

    user.professions = unique([...user.professions, profession])
    return await this.userRepository.save(user)
  }

  async addResource (userId: number | string, resource: Resource) {
    const user = await this.findById(userId, {
      select: ['id'],
      relations: ['resources'],
    })

    user.resources = unique([...user.resources, resource])

    return await this.userRepository.save(user)
  }
}
