import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Brackets, FindManyOptions, FindOneOptions, In, Repository } from 'typeorm'
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

  find (
    criteria: Partial<UserResource>,
    options?: FindManyOptions<UserResource>
  ) {
    return this.userResourceRepository.find({
      where: criteria,
      ...options,
    })
  }

  async findOne (
    criteria: Partial<UserResource>,
    options?: FindOneOptions<UserResource>
  ) {
    return this.userResourceRepository.findOne({
      where: criteria,
      ...options
    })
  }

  async findById (
    resourceId: string | number,
    options?: FindOneOptions<UserResource>
  ) {
    return this.userResourceRepository.findOne({ id: Number(resourceId) }, options)
  }

  findByTitleResource (userId: number, query: string) {
    return this.userResourceRepository.
      createQueryBuilder('userResource').
      leftJoinAndSelect('userResource.user', 'user').
      leftJoinAndSelect('userResource.resource', 'resource').
      where('user.id = :userId', { userId }).
      andWhere(new Brackets(qb => {
        qb.where('LOWER(userResource.title) like LOWER(:title) ', { title: `%${query}%` }).
          orWhere('LOWER(userResource.author) like LOWER(:author) ', { author: `%${query}%` }).
          orWhere('LOWER(resource.title) like LOWER(:title) ', { title: `%${query}%` }).
          orWhere('LOWER(resource.author) like LOWER(:author) ', { author: `%${query}%` })
      })).
      limit(10).
      getMany()
  }

  async addResource (
    user: User,
    skillsetId: number,
    userSkill: UserSkill,
    resource: Resource,
    data: Partial<UserResource> = {},
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
      user.id,
      savedUserResource,
    )
  }

  updateResource (
    user: User,
    id: number,
    data: Partial<UserResource>,
  ) {
    return this.userResourceRepository.update({ id, user }, data)
  }

  async getResourcesBySkillId (
    userId: number,
    skillsetId: number,
    skillId: number,
  ) {

    const resources = await this.userResourceRepository.find({
      relations: ['resource', 'userSkill'],
      where: {
        userId,
        skillsetId,
        skillId,
      },
      order: {
        id: 'DESC',
      },
    })

    return resources.map((userResource) => {
      return getUserResourceWithLikedField(
        userId,
        userResource,
      )
    })
  }

  async getResourcesBulk (
    user: User,
    skillsetId: number,
    userSkillIds: number[],
    limit: number | string = 5
  ) {
    const result = {}

    for (const userSkillId of userSkillIds) {
      const where = {
        user,
        skillsetId,
        userSkill: {
          id: userSkillId
        },
      }

      const userResources: UserResource[] = await this.userResourceRepository.find({
        where,
        order: {
          id: 'DESC',
        },
        take: Number(limit)
      })

      if (userResources.length) {
        result[userSkillId] = {
          total: await this.userResourceRepository.count(where),
          data: userResources.map(userResource => getUserResourceWithLikedField(user.id, userResource))
        }
      } else {
        result[userSkillId] = { total: 0, data: [] }
      }
    }

    return result
  }

  remove (userResource: UserResource) {
    return this.userResourceRepository.remove(userResource)
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
