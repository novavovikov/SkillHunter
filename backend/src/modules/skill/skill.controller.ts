import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiUseTags } from '@nestjs/swagger'
import { SkillService } from './skill.service'

@Controller('skill')
@ApiUseTags('skill')
@UseGuards(AuthGuard('jwt'))
export class SkillController {
  constructor (
    private skillService: SkillService,
  ) {}

  @Get(':id')
  getSkill (@Param('id') id: number) {
    return this.skillService.findById(id)
  }
}
