import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiUseTags } from '@nestjs/swagger'
import { Roles } from '../../common/decorators/roles.decorator'
import { RolesGuard } from '../../common/guards/roles.guard'
import { RoleType } from '../../constants/role-type'
import { SkillDto } from './skill.dto'
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
  getSkill (
    @Param('skillId') skillId: string,
  ) {
    return this.skillService.findById(skillId)
  }

  @Put(':skillId')
  @Roles([RoleType.Admin])
  @ApiUseTags('admin')
  async updateSkill (
    @Body() data: Partial<SkillDto>,
    @Param('skillId') skillId: string,
  ) {
    const id = Number(skillId)
    await this.skillService.update(id, data)

    return {
      id,
      ...data,
    }
  }

  @Delete(':skillId')
  @Roles([RoleType.Admin])
  @ApiUseTags('admin')
  deleteSkill (
    @Param('skillId') skillId: string,
  ) {
    return this.skillService.delete(Number(skillId))
  }
}
