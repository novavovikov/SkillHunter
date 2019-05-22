import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiUseTags } from '@nestjs/swagger'
import { ProfessionService } from '../profession/profession.service'
import { SkillService } from '../skill/skill.service'
import { SUGGESTS } from './constants/uri'
import { SuggestsService } from './suggests.service'

@Controller('suggests')
@ApiUseTags('suggests')
@UseGuards(AuthGuard('jwt'))
export class SuggestsController {
  constructor (
    private suggestsService: SuggestsService,
    private skillService: SkillService,
    private professionService: ProfessionService,
  ) {}

  @Get()
  async getSuggests (
    @Query('profession') profession: string,
    @Query('skill') skill: string,
  ) {
    if (profession) {
      const data = await this.suggestsService.getDataFromHH(SUGGESTS.profession, profession)
      await this.professionService.setProfessions(data.map(item => ({
        ...item,
        accepted: true,
      })))
      return await this.professionService.like('name', profession)
    }

    if (skill) {
      const data = await this.suggestsService.getDataFromHH(SUGGESTS.skill, skill)
      await this.skillService.setSkills(data.map(item => ({
        ...item,
        accepted: true,
      })))
      return await this.skillService.like('name', skill)
    }

    return []
  }
}
