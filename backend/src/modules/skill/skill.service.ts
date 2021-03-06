import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, In, Repository } from 'typeorm'
import { unique } from '../../utils/unique'
import { Resource } from '../resource/resource.entity'
import { SkillDto } from './skill.dto'
import { Skill } from './skill.entity'

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>
  ) {}

  findAll() {
    return this.skillRepository.find({
      order: {
        id: 'DESC',
      },
    })
  }

  async like(field: string, value: string) {
    return await this.skillRepository
      .createQueryBuilder()
      .where(`accepted = true`)
      .andWhere(`LOWER(${field}) LIKE :${field}`, {
        [field]: `${value.toLowerCase()}%`,
      })
      .limit(10)
      .getMany()
  }

  find(criteria: any, options?: FindOneOptions<Skill>) {
    return this.skillRepository.find({
      where: criteria,
      ...options,
    })
  }

  findById(id: number | string, options?: FindOneOptions<Skill>) {
    return this.skillRepository.findOne({
      where: {
        id: Number(id),
      },
      ...options,
    })
  }

  findByIds(skills: number[]) {
    return this.skillRepository.findByIds(skills)
  }

  update(id: number, data: Partial<SkillDto>) {
    return this.skillRepository.update({ id }, data)
  }

  delete(id: number) {
    return this.skillRepository.delete({ id })
  }

  async setSkills(skills: SkillDto[]) {
    if (!skills.length) {
      return []
    }

    // Можно игнорить значения, которые есть в базе при insert, но тогда Id проставляются не последовательно
    const foundSkills = await this.skillRepository.find({
      name: In(skills.map(({ name }) => name)),
    })

    const uniqueSkills = skills.filter(
      skill => !foundSkills.find(({ name }) => skill.name === name)
    )

    if (uniqueSkills.length) {
      return await this.skillRepository.save(uniqueSkills)
    }

    return []
  }

  async addResourceToSkill(skillId: number | string, resource: Resource) {
    const skill: Skill = await this.findById(skillId, {
      relations: ['resources'],
    })

    if (!skill) {
      return null
    }

    skill.resources = unique([...skill.resources, resource])

    return this.skillRepository.save(skill)
  }

  async getSkillList(skills: string[]) {
    let skillList: Skill[] = await this.find({
      name: In(skills),
    })

    if (skillList.length !== skills.length) {
      const notExistentSkills = skills
        .filter(item => !skillList.find(({ name }) => name === item))
        .map(name => ({ name }))
      const createdSkills: Skill[] = await this.setSkills(notExistentSkills)

      skillList = [...skillList, ...createdSkills]
    }

    return skillList
  }
}
