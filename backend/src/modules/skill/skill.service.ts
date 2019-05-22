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

  async like (field: string, value: string) {
    return await this.skillRepository.
      createQueryBuilder().
      where(`LOWER(${field}) LIKE :${field}`,
        {
          [field]: `${value.toLowerCase()}%`,
        },
      ).
      limit(10).
      getMany()
  }

  async find (criteria) {
    return await this.skillRepository.
      find({
        relations: [
          'professions',
        ],
        where: criteria,
      })
  }

  async findById (id: number | string) {
    return await this.skillRepository.
      findOne({
        relations: [
          'professions',
        ],
        where: {
          id: Number(id),
        },
      })
  }

  async findByIds (skills: number[]) {
    return await this.skillRepository.findByIds(skills)
  }

  async setSkills (skills: any) {
    // Можно игнорить значения, которые есть в базе при insert, но тогда Id проставляются не последовательно
    const foundSkills = await this.skillRepository.find(skills)
    const uniqueSkills = skills.filter(
      skill => !foundSkills.find(({ name }) => skill.name === name),
    )

    if (uniqueSkills.length) {
      this.skillRepository.insert(uniqueSkills)
    }
  }
}
