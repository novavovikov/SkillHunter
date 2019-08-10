import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiUseTags } from '@nestjs/swagger'
import { In } from 'typeorm'
import { UserData } from '../../common/decorators/user.decorator'
import { RolesGuard } from '../../common/guards/roles.guard'
import { HttpMessageType } from '../../constants/exception'
import { getUserResourceWithLikedField } from '../../utils/normalizer'
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
    @UserData() user,
    @Param('skillsetId') skillsetId: string,
  ) {
    return this.userSkillService.getSkillsBySkillsetId(user, Number(skillsetId))
  }

  @Get(':skillId/resources')
  @ApiUseTags('user-skill')
  async getSkillResources (
    @UserData() user,
    @Param('skillId') skillId: string,
  ) {
    const userSkill = await this.userSkillService.findById(skillId, {
      relations: ['userResources']
    })

    if (!userSkill) {
      throw new HttpException({
        message: 'User skill does not exist',
        type: HttpMessageType.error,
        statusCode: HttpStatus.NOT_FOUND
      }, HttpStatus.NOT_FOUND)
    }

    return {
      ...userSkill,
      userResources: userSkill.userResources.map(userResource => getUserResourceWithLikedField(user.id, userResource))
    }
  }

  @Post(':skillsetId')
  @ApiUseTags('user-skill')
  async adSkills (
    @UserData() user,
    @Param('skillsetId') skillsetId: string,
    @Body('skills') skills: string[],
  ) {
    const skillList: Skill[] = await this.skillService.getSkillList(skills)
    const createdSkills = await this.userSkillService.find({
      user,
      skillsetId,
      skill: In(skillList.map(({ id }) => id)),
    })

    const newSkills = skillList.filter(({ id }: Skill) => !createdSkills.find(({ skill }) => id === skill.id))

    if (newSkills.length) {
      return await this.userSkillService.addSkills(
        user,
        Number(skillsetId),
        newSkills,
      )
    }

    return []
  }

  @Delete()
  @ApiUseTags('user-skill')
  async deleteSkills (
    @UserData() user,
    @Query('ids') ids: string,
  ) {
    const userSkillsIds = ids.split(',').map(Number)

    await this.userResourceService.removeResourcesByUserSkillIds(user, userSkillsIds)
    return this.userSkillService.deleteSkills(userSkillsIds)
  }
}
