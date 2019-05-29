import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RoleType } from '../../constants/role-type'
import { Profession } from '../profession/profession.entity'
import { Skill } from '../skill/skill.entity'
import { UserDto } from './user.dto'
import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findById (id: number | string) {
    return await this.userRepository.findOne({
      relations: [
        'skills',
        'professions',
      ],
      where: {
        id: Number(id),
      },
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
    const user = await this.findById(userId)

    user.skills = skills
    return await this.userRepository.save(user)
  }

  async setProfessions (userId: number | string, professions: Profession[]) {
    const user = await this.findById(userId)

    user.professions = professions
    return await this.userRepository.save(user)
  }
}
