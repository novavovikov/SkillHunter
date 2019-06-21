import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, In, Repository } from 'typeorm'
import { UserResourceStatusType } from '../../constants/status-type'
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

  async getSkillsByProfessionId (
    userId: number,
    professionId: number,
  ) {
    const foundProfessions = await this.userSkillRepository.find({
      where: {
        userId,
        professionId,
      },
      order: {
        id: 'DESC',
      },
    })

    return foundProfessions.map(({ skill }) => ({
      ...skill,
      professionId,
    }))
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

    const createdSkills = await this.userSkillRepository.save(userSkills)

    return createdSkills.map(({ skill }) => ({
      ...skill,
      professionId,
    }))
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

    const { status } = await this.userResourceRepository.save(userResource)
    return this.getResourceModel(
      resource,
      status,
      user.id,
      professionId,
      skillId
    )
  }

  async updateResource (
    user: User,
    professionId: number,
    skillId: number,
    resource: Resource,
    data: any,
  ) {
    await this.userResourceRepository.update({
      user,
      professionId,
      skillId,
      resource,
    }, data)

    return data
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

    return resources.map(({ status, resource }) => {
      return this.getResourceModel(
        resource,
        status,
        userId,
        professionId,
        skillId
      )
    })
  }

  async getResourcesBulk (
    user: User,
    professionId: number,
    skillsIds: number[],
  ) {
    const userResources = await this.userResourceRepository.find({
      where: {
        user,
        professionId,
        skillId: In(skillsIds),
      },
    })

    return userResources.reduce((acc, {
      professionId,
      skillId,
      resource,
      status
    }) => {
      const resourceData = this.getResourceModel(
        resource,
        status,
        user.id,
        professionId,
        skillId
      )

      if (acc[skillId]) {
        return {
          ...acc,
          [skillId]: [...acc[skillId], resourceData]
        }
      }

      return {
        ...acc,
        [skillId]: [resourceData]
      }
    }, {})
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
      resource,
    })

    this.userResourceRepository.remove(userResources)
  }

  async removeAllResources (
    user: User,
  ) {
    const userResources = await this.userResourceRepository.find({ user })

    return await this.userResourceRepository.remove(userResources)
  }

  getResourceModel = (
    resource: Resource,
    status: string | UserResourceStatusType,
    userId: number,
    professionId: number,
    skillId: number
  ) => ({
    ...resource,
    professionId,
    skillId,
    status,
    likes: resource.userIdsLikes.length,
    isLiked: resource.userIdsLikes.includes(userId),
  })
}
