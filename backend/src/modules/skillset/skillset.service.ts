import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, In, Repository } from 'typeorm'
import { unique } from '../../utils/unique'
import { Skill } from '../skill/skill.entity'
import { SkillsetDto } from './skillset.dto'
import { Skillset } from './skillset.entity'

@Injectable()
export class SkillsetService {
  constructor (
    @InjectRepository(Skillset)
    private skillsetRepository: Repository<Skillset>,
  ) {}

  findAll () {
    return this.skillsetRepository.find({
      order: {
        id: 'ASC',
      },
    })
  }

  find (criteria) {
    return this.skillsetRepository.find({
      where: criteria,
    })
  }

  async findById (id: number | string, options?: FindOneOptions<Skillset>) {
    return await this.skillsetRepository.findOne({
      where: {
        id: Number(id),
      },
      ...options,
    })
  }

  async findByName (name: string, options?: FindOneOptions<Skillset>) {
    return await this.skillsetRepository.findOne({
      where: { name },
      ...options,
    })
  }

  async like (field: string, value: string) {
    return await this.skillsetRepository.
      createQueryBuilder().
      where(`accepted = true`).
      andWhere(`LOWER(${field}) LIKE :${field}`,
        {
          [field]: `${value.toLowerCase()}%`,
        },
      ).
      limit(10).
      getMany()
  }

  async setSkillsets (skillsets: SkillsetDto[]) {
    if (!skillsets.length) {
      return []
    }

    // Можно игнорить значения, которые есть в базе при insert, но тогда Id проставляются не последовательно
    const foundSkillsets = await this.skillsetRepository.find({ name: In(skillsets.map(({ name }) => name)) })

    const uniqueSkillsets = skillsets.filter(
      skillset => !foundSkillsets.find(({ name }) => skillset.name === name),
    )

    if (uniqueSkillsets.length) {
      return this.skillsetRepository.save(uniqueSkillsets)
    }

    return []
  }

  async setSkills (userId: number | string, skills: Skill[]) {
    const user = await this.findById(userId, {
      relations: ['skills'],
    })

    user.skills = unique([...user.skills, ...skills])
    return await this.skillsetRepository.save(user)
  }
}
