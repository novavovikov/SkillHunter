import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiUseTags } from '@nestjs/swagger'
import { RolesGuard } from '../../common/guards/roles.guard'
import { Skill } from '../skill/skill.entity'
import { SkillService } from '../skill/skill.service'
import { UserSkillService } from './user-skill.service'

@Controller('user-skill')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
export class UserSkillController {
  constructor (
    private userSkillService: UserSkillService,
    private skillService: SkillService,
  ) {}

  @Get(':professionId')
  @ApiUseTags('user-skill')
  getSkills (
    @Req() req,
    @Param('professionId') professionId: string,
  ) {
    return this.userSkillService.getSkillsByProfessionId(req.user.id, Number(professionId))
  }

  @Post(':professionId')
  @ApiUseTags('user-skill')
  async adSkills (
    @Req() req,
    @Param('professionId') professionId: string,
    @Body('skills') skills: string[],
  ) {
    const skillList: Skill[] = await this.skillService.getSkillList(skills)

    return await this.userSkillService.addSkills(
      req.user,
      Number(professionId),
      skillList,
    )
  }
}
