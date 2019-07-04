import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm'
import { Skill } from '../skill/skill.entity'
import { User } from '../user/user.entity'
import { UserSkill } from './user-skill.entity'

@Injectable()
export class UserSkillService {
  constructor (
    @InjectRepository(UserSkill)
    private userSkillRepository: Repository<UserSkill>,
  ) {}

  find (criteria: any, options?: FindManyOptions<UserSkill>) {
    return this.userSkillRepository.find({
      where: criteria,
      ...options,
    })
  }

  findByIds (ids: number[], options?: FindManyOptions<UserSkill>) {
    return this.userSkillRepository.findByIds(ids, options)
  }

  findById (id: number | string, options?: FindOneOptions<UserSkill>) {
    return this.userSkillRepository.findOne({
      where: {
        id: Number(id),
      },
      ...options,
    })
  }

  getSkillsBySkillsetId (
    userId: number,
    skillsetId: number,
  ) {
    return this.userSkillRepository.find({
      where: {
        userId,
        skillsetId,
      },
      order: {
        id: 'DESC',
      },
    })
  }

  async addSkills (
    user: User,
    skillsetId: number,
    skills: Skill[],
  ) {
    const userSkills = skills.map(skill => {
      return this.userSkillRepository.create({
        user,
        skillsetId,
        skill,
      })
    })

    return this.userSkillRepository.save(userSkills)
  }

  save (userSkill: UserSkill[]) {
    return this.userSkillRepository.save(userSkill)
  }

  deleteSkills (data: any) {
    return this.userSkillRepository.delete(data)
  }

  async removeSkillsBySkillsetId (
    user: User,
    skillsetId: number,
  ) {
    const userResources = await this.userSkillRepository.find({ user, skillsetId })

    return await this.userSkillRepository.remove(userResources)
  }

  async removeAllSkills (user: User) {
    const userSkills = await this.userSkillRepository.find({ user })

    return await this.userSkillRepository.remove(userSkills)
  }
}
