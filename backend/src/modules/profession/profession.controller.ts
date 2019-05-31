import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiImplicitBody, ApiUseTags } from '@nestjs/swagger'
import { Roles } from '../../common/decorators/roles.decorator'
import { RolesGuard } from '../../common/guards/roles.guard'
import { RoleType } from '../../constants/role-type'
import { Skill } from '../skill/skill.entity'
import { SkillService } from '../skill/skill.service'
import { ProfessionService } from './profession.service'

@Controller('profession')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
export class ProfessionController {
  constructor (
    private professionService: ProfessionService,
    private skillService: SkillService,
  ) {}

  @Get()
  @Roles([RoleType.Admin])
  @ApiUseTags('admin')
  getProfessions () {
    return this.professionService.findAll()
  }

  @Get(':professionId')
  @ApiUseTags('profession')
  getUser (@Param('professionId') professionId: number) {
    return this.professionService.findById(professionId)
  }

  @Post(':professionId/skills')
  @ApiImplicitBody({
    name: 'skill ids',
    type: [Number],
  })
  @ApiUseTags('profession')
  async setSkills (@Body() skills, @Param('professionId') professionId: string) {
    const skillList: Skill[] = await this.skillService.findByIds(skills)
    return this.professionService.setSkills(professionId, skillList)
  }
}
