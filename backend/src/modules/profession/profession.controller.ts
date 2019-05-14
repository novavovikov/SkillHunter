import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Skill } from '../skill/skill.entity'
import { SkillService } from '../skill/skill.service'
import { ProfessionService } from './profession.service'

@Controller('profession')
export class ProfessionController {
  constructor (
    private professionService: ProfessionService,
    private skillService: SkillService
  ) {}

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getUser (@Param('id') id: number) {
    return this.professionService.findById(id)
  }

  @Post(':id/skills')
  @UseGuards(AuthGuard('jwt'))
  async setSkills (@Body() skills: number[], @Param('id') id: string) {
    const skillList: Skill[] = await this.skillService.findByIds(skills)
    return this.professionService.setSkills(id, skillList)
  }
}
