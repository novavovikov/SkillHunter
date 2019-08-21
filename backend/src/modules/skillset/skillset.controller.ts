import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiImplicitBody, ApiUseTags } from '@nestjs/swagger'
import { Roles } from '../../common/decorators/roles.decorator'
import { UserData } from '../../common/decorators/user.decorator'
import { RolesGuard } from '../../common/guards/roles.guard'
import { RoleType } from '../../constants/role-type'
import { Skill } from '../skill/skill.entity'
import { SkillService } from '../skill/skill.service'
import { UserSkillService } from '../user-skill/user-skill.service'
import { User } from '../user/user.entity'
import { SkillsetDto } from './skillset.dto'
import { SkillsetService } from './skillset.service'

@Controller('skillset')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
export class SkillsetController {
  constructor (
    private userSkillService: UserSkillService,
    private skillsetService: SkillsetService,
    private skillService: SkillService,
  ) {}

  @Get()
  @Roles([RoleType.Admin])
  @ApiUseTags('admin')
  getSkillsets () {
    return this.skillsetService.findAll()
  }

  @Get('recommendation/skills/:skillsetName')
  @ApiUseTags('skillset')
  async getSkillsetByName (
    @UserData() user: User,
    @Param('skillsetName') skillsetName: string,
  ) {
    const skillset = await this.skillsetService.findByName(skillsetName, {
      relations: ['skills'],
    })

    if (!skillset) {
      return []
    }

    const userSkills = await this.userSkillService.find({
      skillsetId: skillset.id,
      user
    })

    return skillset.skills.reduce((acc, skill) => {
      if (
        !skill.accepted ||
        userSkills.find(({ id }) => skill.id)
      ) {
        return acc
      }

      return [...acc, skill]
    }, [])
  }

  @Get(':skillsetId')
  @ApiUseTags('skillset')
  getUser (
    @Param('skillsetId') skillsetId: string,
  ) {
    return this.skillsetService.findById(skillsetId)
  }

  @Post()
  @ApiUseTags('skillset')
  setSkillsets (
    @Body('skillsets') skillsets: SkillsetDto[],
  ) {
    return this.skillsetService.setSkillsets(skillsets)
  }

  @Post(':skillsetId/skills')
  @ApiImplicitBody({
    name: 'skill ids',
    type: [Number],
  })

  @ApiUseTags('skillset')
  async setSkills (
    @Body() skills,
    @Param('skillsetId') skillsetId: string,
  ) {
    const skillList: Skill[] = await this.skillService.findByIds(skills)
    return this.skillsetService.setSkills(skillsetId, skillList)
  }
}
