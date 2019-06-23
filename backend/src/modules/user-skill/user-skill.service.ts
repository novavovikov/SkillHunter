import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Skill } from '../skill/skill.entity'
import { User } from '../user/user.entity'
import { UserSkill } from './user-skill.entity'

@Injectable()
export class UserSkillService {
  constructor (
    @InjectRepository(UserSkill)
    private userSkillRepository: Repository<UserSkill>,
  ) {}

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
}
