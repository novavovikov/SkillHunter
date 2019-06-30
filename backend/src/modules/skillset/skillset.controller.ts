import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiImplicitBody, ApiUseTags } from '@nestjs/swagger'
import { Roles } from '../../common/decorators/roles.decorator'
import { RolesGuard } from '../../common/guards/roles.guard'
import { RoleType } from '../../constants/role-type'
import { Skill } from '../skill/skill.entity'
import { SkillService } from '../skill/skill.service'
import { SkillsetDto } from './skillset.dto'
import { SkillsetService } from './skillset.service'

@Controller('skillset')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
export class SkillsetController {
  constructor (
    private skillsetService: SkillsetService,
    private skillService: SkillService,
  ) {}

  @Get()
  @Roles([RoleType.Admin])
  @ApiUseTags('admin')
  getSkillsets () {
    return this.skillsetService.findAll()
  }

  @Post()
  @ApiUseTags('skillset')
  setSkillsets (@Body('skillsets') skillsets: SkillsetDto[]) {
    return this.skillsetService.setSkillsets(skillsets)
  }

  @Get(':skillsetId')
  @ApiUseTags('skillset')
  getUser (@Param('skillsetId') skillsetId: number) {
    return this.skillsetService.findById(skillsetId)
  }

  @Post(':skillsetId/skills')
  @ApiImplicitBody({
    name: 'skill ids',
    type: [Number],
  })
  @ApiUseTags('skillset')
  async setSkills (@Body() skills, @Param('skillsetId') skillsetId: string) {
    const skillList: Skill[] = await this.skillService.findByIds(skills)
    return this.skillsetService.setSkills(skillsetId, skillList)
  }
}
