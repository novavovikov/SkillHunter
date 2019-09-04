import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiUseTags } from '@nestjs/swagger'
import { In } from 'typeorm'
import { UserData } from '../../common/decorators/user.decorator'
import { RolesGuard } from '../../common/guards/roles.guard'
import { HttpMessageType } from '../../constants/exception'
import { unique } from '../../utils/unique'
import { Skill } from '../skill/skill.entity'
import { SkillService } from '../skill/skill.service'
import { SkillsetService } from '../skillset/skillset.service'
import { UserResourceService } from '../user-resource/user-resource.service'
import { User } from '../user/user.entity'
import { UserSkillService } from './user-skill.service'

@Controller('user-skill')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
export class UserSkillController {
  constructor (
    private userSkillService: UserSkillService,
    private userResourceService: UserResourceService,
    private skillsetService: SkillsetService,
    private skillService: SkillService,
  ) {}

  @Get('recommendation/resources')
  @ApiUseTags('skill')
  async getRecommendationsResources (
    @Query('skillIds') skillIds: string,
    @UserData() user: User,
  ) {
    if (!skillIds) {
      return []
    }

    const ids = skillIds.split(',').map(Number)

    const userSkills = await this.userSkillService.find({
      id: In(ids),
    }, {
      join: {
        alias: 'userSkill',
        leftJoinAndSelect: {
          skill: 'userSkill.skill',
          resources: 'skill.resources',
        },
      },
    })

    const userResources = await this.userResourceService.find({
      user,
    }, {
      where: {
        userSkill: {
          id: In(ids),
        },
      },
    })

    return userSkills.reduce((acc, userSkill) => {
      const { resources } = userSkill.skill

      const recommendations = resources.filter(({ author, id, accepted}) => (
        accepted &&
        !author &&
        !userResources.some(({ userSkill, resource }) => (
          userSkill.id === userSkill.id &&
          resource.id === id
        ))
      ))

      return {
        ...acc,
        [userSkill.id]: recommendations.splice(0, 3),
      }
    }, {})
  }

  @Get(':skillsetId/list')
  @ApiUseTags('user-skill')
  getSkills (
    @UserData() user: User,
    @Param('skillsetId') skillsetId: string,
  ) {
    return this.userSkillService.getSkillsBySkillsetId(user, Number(skillsetId))
  }

  @Get(':skillId')
  @ApiUseTags('user-skill')
  async getSkillResources (
    @UserData() user: User,
    @Param('skillId') skillId: string,
  ) {
    const userSkill = await this.userSkillService.findOne({
      id: skillId,
      user
    })

    if (!userSkill) {
      throw new HttpException({
        message: 'User skill does not exist',
        type: HttpMessageType.error,
        statusCode: HttpStatus.NOT_FOUND
      }, HttpStatus.NOT_FOUND)
    }

    return userSkill
  }

  @Post(':skillsetId')
  @ApiUseTags('user-skill')
  async adSkills (
    @UserData() user: User,
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

    const foundSkillset = await this.skillsetService.findById(skillsetId, {
      relations: ['skills'],
    })

    if (!foundSkillset) {
      throw new HttpException({
        message: 'Skillset does not exist',
        type: HttpMessageType.error,
        statusCode: HttpStatus.NOT_FOUND,
      }, HttpStatus.NOT_FOUND)
    }

    foundSkillset.skills = unique([...foundSkillset.skills, ...newSkills])
    await this.skillsetService.save(foundSkillset)

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
    @UserData() user: User,
    @Query('ids') ids: string,
  ) {
    const userSkillsIds = ids.split(',').map(Number)

    await this.userResourceService.removeResourcesByUserSkillIds(user, userSkillsIds)
    return this.userSkillService.deleteSkills(userSkillsIds)
  }
}
