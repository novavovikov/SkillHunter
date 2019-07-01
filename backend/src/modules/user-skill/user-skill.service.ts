import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
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

  async getSkillsBySkillsetId (
    userId: number,
    skillsetId: number,
  ) {
    const foundSkillsets = await this.userSkillRepository.find({
      where: {
        userId,
        skillsetId,
      },
      order: {
        id: 'DESC',
      },
    })

    return foundSkillsets.map(({ skill }) => ({
      ...skill,
      skillsetId,
    }))
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

    const createdSkills = await this.userSkillRepository.save(userSkills)

    return createdSkills.map(({ skill }) => ({
      ...skill,
      skillsetId,
    }))
  }

  async removeSkillsBySkillsetId (
    user: User,
    skillsetId: number,
  ) {
    const userResources = await this.userSkillRepository.find({ user, skillsetId })

    return await this.userSkillRepository.remove(userResources)
  }

  async removeAllSkills (
    user: User,
  ) {
    const userSkills = await this.userSkillRepository.find({ user })

    return await this.userSkillRepository.remove(userSkills)
  }
}
