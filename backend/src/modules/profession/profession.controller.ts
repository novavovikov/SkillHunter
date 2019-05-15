import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiImplicitBody, ApiUseTags } from '@nestjs/swagger'
import { Skill } from '../skill/skill.entity'
import { SkillService } from '../skill/skill.service'
import { ProfessionService } from './profession.service'

@Controller('profession')
@ApiUseTags('profession')
@UseGuards(AuthGuard('jwt'))
export class ProfessionController {
  constructor (
    private professionService: ProfessionService,
    private skillService: SkillService,
  ) {}

  @Get(':id')
  getUser (@Param('id') id: number) {
    return this.professionService.findById(id)
  }

  @Post(':id/skills')
  @ApiImplicitBody({
    name: 'skill ids',
    type: [Number],
  })
  async setSkills (@Body() skills, @Param('id') id: string) {
    const skillList: Skill[] = await this.skillService.findByIds(skills)
    return this.professionService.setSkills(id, skillList)
  }
}
