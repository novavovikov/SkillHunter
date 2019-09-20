import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { ActivityService } from './activity.service'
import { AuthGuard } from '@nestjs/passport'
import { ApiUseTags } from '@nestjs/swagger'
import { UserData } from '../../common/decorators/user.decorator'
import { User } from '../user/user.entity'
import { UserSkillService } from '../user-skill/user-skill.service'

@Controller('activity')
@UseGuards(AuthGuard('jwt'))
export class ActivityController {
  constructor (
    private activityService: ActivityService,
    private userSkillService: UserSkillService,
  ) {}

  @Get('skillset/:skillsetId')
  @ApiUseTags('activity')
  getProgressBySkillsetId (
    @UserData() user: User,
    @Param('skillsetId') skillsetId: string,
  ) {
    return this.activityService.progressByUserResources(user, {
      skillsetId: Number(skillsetId)
    })
  }

  @Get('skill/:skillId')
  @ApiUseTags('activity')
  async getProgressBySkillId (
    @UserData() user: User,
    @Param('skillId') skillId: string,
  ) {
    const userSkill = await this.userSkillService.findOne({ id: Number(skillId) })
    return this.activityService.progressByUserResources(user, {
      userSkill
    })
  }
}
