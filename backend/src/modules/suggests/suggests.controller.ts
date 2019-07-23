import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiUseTags } from '@nestjs/swagger'
import { textNormalizer } from '../../utils/normalizer'
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
      const normalizedText = textNormalizer(skillset)
      const data = await this.suggestsService.getDataFromHH(SUGGESTS.skillset, normalizedText)
      await this.skillsetService.setSkillsets(data.map(item => ({
        ...item,
        accepted: true,
      })))

      return this.skillsetService.like('name', normalizedText)
    }

    if (skill) {
      const normalizedText = textNormalizer(skill)
      const data = await this.suggestsService.getDataFromHH(SUGGESTS.skill, normalizedText)
      await this.skillService.setSkills(data.map(item => ({
        ...item,
        accepted: true,
      })))

      return this.skillService.like('name', normalizedText)
    }

    return []
  }
}
