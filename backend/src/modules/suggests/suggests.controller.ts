import { Controller, Get, Query } from '@nestjs/common'
import { SkillService } from '../skill/skill.service'
import { SUGGESTS } from './constants/uri'
import { SuggestsService } from './suggests.service'

@Controller('suggests')
export class SuggestsController {
  constructor (
    private suggestsService: SuggestsService,
    private skillService: SkillService
  ) {}

  @Get()
  async getSuggests (
    @Query('position') position: string,
    @Query('skill') skill: string,
  ) {
    if (position && position.length > 1) {
      return this.suggestsService.getDataFromHH(SUGGESTS.position, position)
    }

    if (skill) {
      const data = await this.suggestsService.getDataFromHH(SUGGESTS.skill, skill)
      this.skillService.setSkills(data)
      return data
    }

    return {
      items: []
    }
  }
}
