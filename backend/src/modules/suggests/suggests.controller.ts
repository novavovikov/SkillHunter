import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiUseTags } from '@nestjs/swagger'
import { SkillsetService } from '../skillset/skillset.service'
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
    private skillsetService: SkillsetService,
  ) {}

  @Get()
  async getSuggests (
    @Query('skillset') skillset: string,
    @Query('skill') skill: string,
  ) {
    if (skillset) {
      const data = await this.suggestsService.getDataFromHH(SUGGESTS.skillset, skillset)
      await this.skillsetService.setSkillsets(data.map(item => ({
        ...item,
        accepted: true,
      })))
      return await this.skillsetService.like('name', skillset)
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
