import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, In, Repository } from 'typeorm'
import { getUserResourceWithLikedField } from '../../utils/normalizer'
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

  async findById (
    resourceId: string | number,
    options?: FindOneOptions<UserResource>
  ) {
    return this.userResourceRepository.findOne({ id: Number(resourceId) }, options)
  }

  async addResource (
    user: User,
    skillsetId: number,
    userSkill: UserSkill,
    resource: Resource,
    data: Partial<UserResource>,
  ) {
    const userResource = this.userResourceRepository.create({
      ...data,
      user,
      skillsetId,
      userSkill,
      resource,
    })
    const savedUserResource = await this.userResourceRepository.save(userResource)

    return getUserResourceWithLikedField(
      savedUserResource,
      user.id,
    )
  }

  updateResource (
    id: number,
    data: Partial<UserResource>,
  ) {
    return this.userResourceRepository.update(id, data)
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

    return resources.map((userResource) => {
      return getUserResourceWithLikedField(
        userResource,
        userId,
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

    return userResources.reduce((acc, userResource) => {

      const userSkillId = userResource.userSkill.id
      const resourceData = getUserResourceWithLikedField(
        userResource,
        user.id,
      )

      if (acc[userSkillId]) {
        return {
          ...acc,
          [userSkillId]: [...acc[userSkillId], resourceData],
        }
      }

      return {
        ...acc,
        [userSkillId]: [resourceData],
      }
    }, {})
  }

  async remove (id: number) {
    const userResource = await this.userResourceRepository.findOne(id)

    this.userResourceRepository.remove(userResource)
  }

  async removeResourcesBySkillsetId (
    user: User,
    skillsetId: number,
  ) {
    const userResources = await this.userResourceRepository.find({ user, skillsetId })

    return await this.userResourceRepository.remove(userResources)
  }

  async removeResourcesByUserSkillIds (
    user: User,
    userSkillIds: number[],
  ) {
    const userResources = await this.userResourceRepository.find({
      user,
      userSkill: In(userSkillIds),
    })

    return await this.userResourceRepository.remove(userResources)
  }

  async removeAllResources (
    user: User,
  ) {
    const userResources = await this.userResourceRepository.find({ user })

    return await this.userResourceRepository.remove(userResources)
  }
}
