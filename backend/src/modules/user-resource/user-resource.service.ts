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
      skillId,
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

    return {
      id: resource.id,
      skillId,
      professionId,
      ...data,
    }
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
        skillId,
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
      status,
    }) => {
      const resourceData = this.getResourceModel(
        resource,
        status,
        user.id,
        professionId,
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

  async removeResourcesByProfessionId (
    user: User,
    professionId: number
  ) {
    const userResources = await this.userResourceRepository.find({ user, professionId })

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
    professionId: number,
    skillId: number,
  ) => ({
    ...resource,
    professionId,
    skillId,
    status,
    likes: resource.userIdsLikes.length,
    isLiked: resource.userIdsLikes.includes(userId),
  })
}
