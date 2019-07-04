import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiUseTags } from '@nestjs/swagger'
import { In } from 'typeorm'
import { RolesGuard } from '../../common/guards/roles.guard'
import { Skill } from '../skill/skill.entity'
import { SkillService } from '../skill/skill.service'
import { UserResourceService } from '../user-resource/user-resource.service'
import { UserSkillService } from './user-skill.service'

@Controller('user-skill')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
export class UserSkillController {
  constructor (
    private userSkillService: UserSkillService,
    private userResourceService: UserResourceService,
    private skillService: SkillService,
  ) {}

  @Get(':skillsetId')
  @ApiUseTags('user-skill')
  getSkills (
    @Req() req,
    @Param('skillsetId') skillsetId: string,
  ) {
    return this.userSkillService.getSkillsBySkillsetId(req.user.id, Number(skillsetId))
  }

  @Post(':skillsetId')
  @ApiUseTags('user-skill')
  async adSkills (
    @Req() req,
    @Param('skillsetId') skillsetId: string,
    @Body('skills') skills: string[],
  ) {
    const skillList: Skill[] = await this.skillService.getSkillList(skills)
    const createdSkills = await this.userSkillService.find({
      user: req.user,
      skillsetId,
      skill: In(skillList.map(({ id }) => id)),
    })

    const newSkills = skillList.filter(({ id }: Skill) => !createdSkills.find(({ skill }) => id === skill.id))

    if (newSkills.length) {
      return await this.userSkillService.addSkills(
        req.user,
        Number(skillsetId),
        newSkills,
      )
    }

    return []
  }

  @Delete()
  @ApiUseTags('user-skill')
  async deleteSkills (
    @Req() req,
    @Query('ids') ids: string,
  ) {
    const userSkillsIds = ids.split(',').map(Number)

    await this.userResourceService.removeResourcesByUserSkillIds(req.user, userSkillsIds)
    return this.userSkillService.deleteSkills(userSkillsIds)
  }
}
