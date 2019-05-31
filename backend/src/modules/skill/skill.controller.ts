import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiUseTags } from '@nestjs/swagger'
import { Roles } from '../../common/decorators/roles.decorator'
import { RolesGuard } from '../../common/guards/roles.guard'
import { RoleType } from '../../constants/role-type'
import { SkillService } from './skill.service'

@Controller('skill')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
export class SkillController {
  constructor (
    private skillService: SkillService,
  ) {}

  @Get()
  @Roles([RoleType.Admin])
  @ApiUseTags('admin')
  getSkills () {
    return this.skillService.findAll()
  }

  @Get(':skillId')
  @ApiUseTags('skill')
  getSkill (@Param('skillId') skillId: number) {
    return this.skillService.findById(skillId)
  }
}
