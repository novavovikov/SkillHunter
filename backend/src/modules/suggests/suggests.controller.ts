import { Controller, Get, Query } from '@nestjs/common'
import { SuggestsService } from './suggests.service'

@Controller('suggests')
export class SuggestsController {
  constructor (private suggestsService: SuggestsService) {}

  @Get()
  getSuggests (
    @Query('position') position: string,
    @Query('skill') skill: string,
  ) {
    if (position) {
      return this.suggestsService.getByPosition(position)
    }

    if (skill) {
      return this.suggestsService.getBySkill(skill)
    }

    return {
      items: []
    }
  }
}
