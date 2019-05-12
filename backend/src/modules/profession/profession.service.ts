import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Profession } from './profession.entity'

@Injectable()
export class ProfessionService {
  constructor (
    @InjectRepository(Profession)
    private professionRepository: Repository<Profession>,
  ) {}

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
}
