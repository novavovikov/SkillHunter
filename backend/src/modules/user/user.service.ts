import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, Repository } from 'typeorm'
import { unique } from '../../utils/unique'
import { Profession } from '../profession/profession.entity'
import { Resource } from '../resource/resource.entity'
import { Skill } from '../skill/skill.entity'
import { UserDto } from './user.dto'
import { User } from './user.entity'
import { UserResource } from './userResource.entity'
import { UserSkill } from './userSkill.entity'

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserSkill)
    private userSkillRepository: Repository<UserSkill>,
    @InjectRepository(UserResource)
    private userResourceRepository: Repository<UserResource>,
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

  getSkillsByProfessionId (
    userId: number,
    professionId: number,
  ) {
    return this.userSkillRepository.find({
      select: ['professionId'],
      relations: ['skill'],
      where: {
        userId,
        professionId,
      },
    })
  }

  async addSkills (
    user: User,
    professionId: number,
    skills: Skill[],
  ) {
    const userSkills = skills.map(skill => {
      return this.userSkillRepository.create({
        user,
        professionId,
        skill,
      })
    })

    return await this.userSkillRepository.save(userSkills)
  }

  async removeAllSkills (
    user: User,
  ) {
    const userSkills = await this.userSkillRepository.find({ user })

    return await this.userSkillRepository.remove(userSkills)
  }

  async addProfession (userId: number | string, profession: Profession) {
    const user = await this.findById(userId, {
      relations: ['professions'],
    })

    user.professions = unique([...user.professions, profession])
    return await this.userRepository.save(user)
  }

  async addResource (
    user: User,
    professionId: number,
    skillId: number,
    resource: Resource,
  ) {
    const userResource = this.userResourceRepository.create({
      user,
      professionId,
      skillId,
      resource,
    })
    return this.userResourceRepository.save(userResource)
  }

  async getResourcesBySkillId (
    userId: number,
    professionId: number,
    skillId: number,
  ) {

    const resources = await this.userResourceRepository.find({
      select: ['status'],
      relations: ['resource'],
      where: {
        userId,
        professionId,
        skillId,
      },
    })

    return resources.map(({ status, resource }) => ({
      ...resource,
      professionId,
      skillId,
      status,
      likes: resource.userIdsLikes.length,
      isLiked: resource.userIdsLikes.includes(userId),
    }))
  }

  async removeResourceBySkillId (
    user: User,
    professionId: number,
    skillId: number,
    resource: Resource,
  ) {
    const userResources = await this.userResourceRepository.find({
      user,
      professionId,
      skillId,
      resource
    })

    this.userResourceRepository.remove(userResources)
  }

  async removeAllResources (
    user: User,
  ) {
    const userResources = await this.userResourceRepository.find({ user })

    return await this.userResourceRepository.remove(userResources)
  }
}
