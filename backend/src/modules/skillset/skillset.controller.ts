import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Session,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiImplicitBody, ApiUseTags } from '@nestjs/swagger'
import { Roles } from '../../common/decorators/roles.decorator'
import { UserData } from '../../common/decorators/user.decorator'
import { RolesGuard } from '../../common/guards/roles.guard'
import { HttpMessageType } from '../../constants/exception'
import { RoleType } from '../../constants/role-type'
import { Skill } from '../skill/skill.entity'
import { SkillService } from '../skill/skill.service'
import { UserSkillService } from '../user-skill/user-skill.service'
import { User } from '../user/user.entity'
import { SkillsetDto } from './skillset.dto'
import { SkillsetService } from './skillset.service'
import { SkillDto } from '../skill/skill.dto'

@Controller('skillset')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
export class SkillsetController {
  constructor(
    private userSkillService: UserSkillService,
    private skillsetService: SkillsetService,
    private skillService: SkillService
  ) {}

  @Get()
  @Roles([RoleType.Admin])
  @ApiUseTags('admin')
  getSkillsets() {
    return this.skillsetService.findAll()
  }

  @Get('recommendation/skills/:skillsetName')
  @ApiUseTags('skillset')
  async getSkillsetByName(
    @UserData() user: User,
    @Param('skillsetName') skillsetName: string
  ) {
    const skillset = await this.skillsetService.findByName(skillsetName, {
      relations: ['skills'],
    })

    if (!skillset) {
      return []
    }

    const userSkills = await this.userSkillService.find({
      skillsetId: skillset.id,
      user,
    })

    return skillset.skills.reduce((acc, skill) => {
      if (
        !skill.accepted ||
        userSkills.find(userSkill => skill.id === userSkill.skill.id)
      ) {
        return acc
      }

      return [...acc, skill]
    }, [])
  }

  @Get('landing')
  @ApiUseTags('skillset')
  getSkillsetFromLanding(@Session() session) {
    return session.skillset
  }

  @Get(':skillsetId')
  @ApiUseTags('skillset')
  getUser(@Param('skillsetId') skillsetId: string) {
    return this.skillsetService.findById(skillsetId)
  }

  @Post()
  @ApiUseTags('skillset')
  setSkillsets(@Body('skillsets') skillsets: SkillsetDto[]) {
    return this.skillsetService.setSkillsets(skillsets)
  }

  @Post(':skillsetId/skills')
  @ApiUseTags('skillset')
  @ApiImplicitBody({
    name: 'skill ids',
    type: [Number],
  })
  async setSkills(@Body() skills, @Param('skillsetId') skillsetId: string) {
    const skillList: Skill[] = await this.skillService.findByIds(skills)
    return this.skillsetService.setSkills(skillsetId, skillList)
  }

  @Put(':skillsetId')
  @UseGuards(AuthGuard('jwt'))
  @Roles([RoleType.Admin])
  @ApiUseTags('admin')
  async updateSkill(
    @Body() data: Partial<SkillDto>,
    @Param('skillsetId') skillsetId: string
  ) {
    const id = Number(skillsetId)
    await this.skillsetService.update(id, data)

    return {
      id,
      ...data,
    }
  }

  @Delete(':skillsetId')
  @UseGuards(AuthGuard('jwt'))
  @Roles([RoleType.Admin])
  @ApiUseTags('admin')
  async removeResource(@Param('skillsetId') skillsetId: string) {
    const skillset = await this.skillsetService.findById(Number(skillsetId), {
      relations: ['users'],
    })

    if (skillset.users.length) {
      throw new HttpException(
        {
          message: 'This skillset has relations',
          type: HttpMessageType.warning,
          statusCode: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST
      )
    }

    return this.skillsetService.remove(skillset)
  }
}
