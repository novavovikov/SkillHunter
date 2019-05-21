import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Skill } from './skill.entity'

@Injectable()
export class SkillService {
  constructor (
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}

  async findById (id: number | string) {
    return await this.skillRepository.findOne({
      relations: [
        'professions'
      ],
      where: {
        id: Number(id)
      },
    })
  }

  async findByIds (skills: number[]) {
    return await this.skillRepository.findByIds(skills)
  }

  setSkills (data: any) {
    data.subscribe(async resp => {
      const skills = resp.items.
        map(({ id, text }) => ({
          externalId: id,
          name: text,
        }))

      // Можно игнорить значения, которые есть в базе при insert, но тогда Id проставляются не последовательно
      const foundSkills = await this.skillRepository.find(skills)
      const uniqueSkills = skills.filter(
        skill => !foundSkills.find(({ externalId }) => skill.externalId === externalId),
      )

      if (uniqueSkills.length) {
        this.skillRepository.insert(uniqueSkills)
      }
    })
  }
}