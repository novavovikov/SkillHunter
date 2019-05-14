import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { unique } from '../../utils/unique'
import { Skill } from '../skill/skill.entity'
import { Profession } from './profession.entity'

@Injectable()
export class ProfessionService {
  constructor (
    @InjectRepository(Profession)
    private professionRepository: Repository<Profession>,
  ) {}

  async findById (id: number | string) {
    return await this.professionRepository.findOne({
      relations: [
        'skills'
      ],
      where: {
        id: Number(id)
      },
    })
  }

  async findByIds (skills: number[]) {
    return await this.professionRepository.findByIds(skills)
  }

  setProfessions (data: any) {
    data.subscribe(async resp => {
      const professions = resp.items.
        map(({ id, text }) => ({
          externalId: id,
          name: text,
        }))

      // Можно игнорить значения, которые есть в базе при insert, но тогда Id проставляются не последовательно
      const foundProfessions = await this.professionRepository.find(professions)
      const uniqueProfessions = professions.filter(
        profession => !foundProfessions.find(({ externalId }) => profession.externalId === externalId),
      )

      if (uniqueProfessions.length) {
        this.professionRepository.insert(uniqueProfessions)
      }
    })
  }

  async setSkills (userId: number | string, skills: Skill[]) {
    const user = await this.findById(userId)

    user.skills = unique([...user.skills, ...skills])
    return await this.professionRepository.save(user)
  }
}
