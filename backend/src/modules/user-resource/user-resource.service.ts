import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { UserResourceStatusType } from '../../constants/status-type'
import { Resource } from '../resource/resource.entity'
import { UserSkill } from '../user-skill/user-skill.entity'
import { User } from '../user/user.entity'
import { UserResource } from './user-resource.entity'

@Injectable()
export class UserResourceService {
  constructor (
    @InjectRepository(UserResource)
    private userResourceRepository: Repository<UserResource>,
  ) {}

  async addResource (
    user: User,
    skillsetId: number,
    userSkill: UserSkill,
    resource: Resource,
  ) {
    const userResource = this.userResourceRepository.create({
      user,
      skillsetId,
      userSkill,
      resource,
    })

    const { status } = await this.userResourceRepository.save(userResource)
    return this.getResourceModel(
      resource,
      status,
      user.id,
      skillsetId,
      userSkill.id,
    )
  }

  async updateResource (
    user: User,
    skillsetId: number,
    userSkill: UserSkill,
    resource: Resource,
    data: any,
  ) {
    await this.userResourceRepository.update({
      user,
      skillsetId,
      userSkill,
      resource,
    }, data)

    return {
      id: resource.id,
      skillId: userSkill.id,
      skillsetId,
      ...data,
    }
  }

  async getResourcesBySkillId (
    userId: number,
    skillsetId: number,
    skillId: number,
  ) {

    const resources = await this.userResourceRepository.find({
      select: ['status'],
      relations: ['resource'],
      where: {
        userId,
        skillsetId,
        skillId,
      },
    })

    return resources.map(({ status, resource }) => {
      return this.getResourceModel(
        resource,
        status,
        userId,
        skillsetId,
        skillId,
      )
    })
  }

  async getResourcesBulk (
    user: User,
    skillsetId: number,
    skillsIds: number[],
  ) {
    const userResources = await this.userResourceRepository.find({
      where: {
        user,
        skillsetId,
        skill: In(skillsIds),
      },
    })

    return userResources.reduce((acc, {
      userSkill,
      resource,
      status,
    }) => {
      const skillId = userSkill.id
      const resourceData = this.getResourceModel(
        resource,
        status,
        user.id,
        skillsetId,
        skillId,
      )

      if (acc[skillId]) {
        return {
          ...acc,
          [skillId]: [...acc[skillId], resourceData],
        }
      }

      return {
        ...acc,
        [skillId]: [resourceData],
      }
    }, {})
  }

  async removeResourceBySkillId (
    user: User,
    skillsetId: number,
    userSkill: UserSkill,
    resource: Resource,
  ) {
    const userResources = await this.userResourceRepository.find({
      user,
      skillsetId,
      userSkill,
      resource,
    })

    this.userResourceRepository.remove(userResources)
  }

  async removeResourcesBySkillsetId (
    user: User,
    skillsetId: number,
  ) {
    const userResources = await this.userResourceRepository.find({ user, skillsetId })

    return await this.userResourceRepository.remove(userResources)
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
    skillsetId: number,
    skillId: number,
  ) => ({
    ...resource,
    skillsetId,
    skillId,
    status,
    likes: resource.userIdsLikes.length,
    isLiked: resource.userIdsLikes.includes(userId),
  })
}
