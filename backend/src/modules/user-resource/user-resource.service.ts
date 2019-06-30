import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { UserResourceStatusType } from '../../constants/status-type'
import { Resource } from '../resource/resource.entity'
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
    skillId: number,
    resource: Resource,
  ) {
    const userResource = this.userResourceRepository.create({
      user,
      skillsetId,
      skillId,
      resource,
    })

    const { status } = await this.userResourceRepository.save(userResource)
    return this.getResourceModel(
      resource,
      status,
      user.id,
      skillsetId,
      skillId,
    )
  }

  async updateResource (
    user: User,
    skillsetId: number,
    skillId: number,
    resource: Resource,
    data: any,
  ) {
    await this.userResourceRepository.update({
      user,
      skillsetId,
      skillId,
      resource,
    }, data)

    return {
      id: resource.id,
      skillId,
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
        skillId: In(skillsIds),
      },
    })

    return userResources.reduce((acc, {
      skillsetId,
      skillId,
      resource,
      status,
    }) => {
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
    skillId: number,
    resource: Resource,
  ) {
    const userResources = await this.userResourceRepository.find({
      user,
      skillsetId,
      skillId,
      resource,
    })

    this.userResourceRepository.remove(userResources)
  }

  async removeResourcesBySkillsetId (
    user: User,
    skillsetId: number
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
