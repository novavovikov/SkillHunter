import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { SkillService } from './skill.service'

@Controller('skill')
export class SkillController {
  constructor (
    private skillService: SkillService,
  ) {}

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getUser (@Param('id') id: number) {
    return this.skillService.findById(id)
  }
}
