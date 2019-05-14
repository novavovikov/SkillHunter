import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ProfessionService } from '../profession/profession.service'
import { SkillService } from '../skill/skill.service'
import { SUGGESTS } from './constants/uri'
import { SuggestsService } from './suggests.service'

@Controller('suggests')
export class SuggestsController {
  constructor (
    private suggestsService: SuggestsService,
    private skillService: SkillService,
    private professionService: ProfessionService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getSuggests (
    @Query('profession') profession: string,
    @Query('skill') skill: string,
  ) {
    if (profession && profession.length > 1) {
      const data = await this.suggestsService.getDataFromHH(SUGGESTS.profession, profession)
      this.professionService.setProfessions(data)
      return data
    }

    if (skill) {
      const data = await this.suggestsService.getDataFromHH(SUGGESTS.skill, skill)
      this.skillService.setSkills(data)
      return data
    }

    return {
      items: [],
    }
  }
}
