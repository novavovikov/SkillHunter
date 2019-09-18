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
import { ApiUseTags } from '@nestjs/swagger'
import { In } from 'typeorm'
import { Roles } from '../../common/decorators/roles.decorator'
import { UserData } from '../../common/decorators/user.decorator'
import { RolesGuard } from '../../common/guards/roles.guard'
import { HttpMessageType } from '../../constants/exception'
import { RoleType } from '../../constants/role-type'
import { unique } from '../../utils/unique'
import { Skill } from '../skill/skill.entity'
import { SkillService } from '../skill/skill.service'
import { Skillset } from '../skillset/skillset.entity'
import { SkillsetService } from '../skillset/skillset.service'
import { UserResourceService } from '../user-resource/user-resource.service'
import { UserSkillService } from '../user-skill/user-skill.service'
import { UserDto } from './user.dto'
import { User } from './user.entity'
import { UserService } from './user.service'
import { WELCOME_RESOURCE_ID, WELCOME_SKILL_NAME } from '../../constants/welcome'
import { ResourceService } from '../resource/resource.service'
import { UserSkill } from '../user-skill/user-skill.entity'
import { UserSettingsService } from '../user-settings/user-settings.service'

@Controller('user')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(
    private userService: UserService,
    private userSettingService: UserSettingsService,
    private userSkillService: UserSkillService,
    private userResourceService: UserResourceService,
    private skillsetService: SkillsetService,
    private skillService: SkillService,
    private resourceService: ResourceService
  ) {}

  @Get()
  @Roles([RoleType.Admin])
  @ApiUseTags('admin')
  async getUsers() {
    const users = await this.userService.findAll()

    return {
      total: users.length,
      data: users,
    }
  }

  @Get('me')
  @ApiUseTags('user')
  getCurrentUser(@UserData() user: User) {
    const { facebookId, googleId, telegramId, ...userData } = user

    return userData
  }

  @Get(':userId')
  @Roles([RoleType.Admin])
  @ApiUseTags('admin')
  async getUsersDataById(@Param('userId') userId: string) {
    const user = await this.userService.findById(userId)
    const skillsetIds = user.skillsets.map(({ id }) => id)

    if (!skillsetIds.length) {
      return user
    }

    const skills = await this.userSkillService.find(
      {
        user,
        skillsetId: In(skillsetIds),
      },
      {
        relations: ['userResources'],
      }
    )

    return {
      ...user,
      skillsets: user.skillsets.map(skillset => {
        const userSkills = skills.filter(
          ({ skillsetId }) => skillsetId === skillset.id
        )

        return {
          ...skillset,
          userSkills,
        }
      }),
    }
  }

  @Put(':userId')
  @Roles([RoleType.Admin])
  @ApiUseTags('admin')
  async updateUserById (
    @Body() data: UserDto,
    @Param('userId') userId: string,
  ) {
    const user = await this.userService.findById(Number(userId))

    if (!user) {
      throw new HttpException(
        {
          message: 'The user is not found',
          type: HttpMessageType.error,
          statusCode: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      )
    }

    return this.userService.save({
      ...user,
      ...data
    } as User)
  }

  @Put()
  @ApiUseTags('user')
  updateUser(@Body() data: UserDto, @UserData() user) {
    const updatedData: UserDto = {}

    if (data.picture) {
      updatedData.picture = data.picture
    }

    if (data.name) {
      updatedData.name = data.name
    }

    if (data.email) {
      updatedData.email = data.email
    }

    if (data.locale) {
      updatedData.locale = data.locale
    }

    return this.userService.update(user.id, updatedData)
  }

  @Get('skillsets')
  @ApiUseTags('user')
  async getSkillset(@UserData() user): Promise<Skillset[]> {
    const { skillsets } = await this.userService.findById(user.id, {
      select: ['id'],
      relations: ['skillsets'],
    })

    return skillsets
  }

  @Post('skillset')
  @ApiUseTags('user')
  async addSkillset(
    @Body('skillset') skillset: string,
    @Body('skills') skills: string[],
    @UserData() user: User,
    @Session() session
  ) {
    if (user.skillsets.find(({ name }) => name === skillset)) {
      throw new HttpException(
        {
          message: 'The skillset has already been added',
          type: HttpMessageType.warning,
          statusCode: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST
      )
    }

    const foundSkillset = await this.skillsetService.findByName(skillset, {
      relations: ['skills'],
    })

    if (!foundSkillset) {
      throw new HttpException(
        {
          message:
            'There were some problems while creating this skillset.\nPlease contact us.',
          type: HttpMessageType.error,
          statusCode: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND
      )
    }

    // FIXME отключили welcome скил на время
    const skillNames =
      user.skillsets.length === -1 ? [...skills, WELCOME_SKILL_NAME] : skills

    const skillList: Skill[] = await this.skillService.getSkillList(skillNames)
    foundSkillset.skills = unique([...foundSkillset.skills, ...skillList])

    const updatedUser = await this.userService.addSkillset(user, foundSkillset)
    const userSkills = await this.userSkillService.addSkills(
      user,
      foundSkillset.id,
      skillList
    )

    // FIXME отключили welcome скил на время
    if (user.skillsets.length === -1) {
      const welcomeSkill = userSkills.find(
        ({ skill }) => skill.name === WELCOME_SKILL_NAME
      )
      await this.createWelcomeSkill(user, foundSkillset.id, welcomeSkill)
    }

    session.destroy()
    return updatedUser.skillsets
  }

  @Post('skillset/copy')
  @Roles([RoleType.Admin])
  @ApiUseTags('admin')
  async copySkillset(
    @Body('source') source: string,
    @Body('target') target: string,
    @UserData() user: User
  ) {
    if (user.skillsets.find(({ name }) => name === target)) {
      throw new HttpException(
        {
          message: 'The skillset already exists',
          type: HttpMessageType.warning,
          statusCode: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST
      )
    }

    const sourceSkillset = await this.skillsetService.findByName(source, {
      relations: ['skills'],
    })

    if (!sourceSkillset) {
      throw new HttpException(
        {
          message:
            'There were some problems while creating this skillset.\nPlease contact us.',
          type: HttpMessageType.error,
          statusCode: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND
      )
    }

    let targetSkillset = await this.skillsetService.findByName(target)

    if (!targetSkillset) {
      ;[targetSkillset] = await this.skillsetService.setSkillsets([
        {
          name: target,
          accepted: true,
        },
      ])
    }

    targetSkillset.skills = sourceSkillset.skills
    await this.skillsetService.save(targetSkillset)

    const updatedUser = await this.userService.addSkillset(user, targetSkillset)
    await this.userSkillService.addSkills(
      user,
      targetSkillset.id,
      targetSkillset.skills
    )

    return updatedUser.skillsets
  }

  @Delete()
  @ApiUseTags('user')
  async deleteUser(@UserData() user) {
    await this.userResourceService.removeAllResources(user)
    await this.userSkillService.removeAllSkills(user)
    await this.userSettingService.delete(user)
    return this.userService.delete(user.id)
  }

  @Delete('skillset/:skillsetId')
  @ApiUseTags('user')
  async removeSkillset(
    @Param('skillsetId') skillsetId: string,
    @UserData() user
  ) {
    await this.userResourceService.removeResourcesBySkillsetId(
      user,
      Number(skillsetId)
    )
    await this.userSkillService.removeSkillsBySkillsetId(
      user,
      Number(skillsetId)
    )
    await this.userService.removeSkillset(user.id, Number(skillsetId))
  }

  createWelcomeSkill = async (
    user: User,
    skillsetId: number,
    userSkill: UserSkill
  ) => {
    // FIXME don't use ID an NAME
    const welcomeResource = await this.resourceService.findById(
      WELCOME_RESOURCE_ID
    )

    if (userSkill && welcomeResource) {
      return this.userResourceService.addResource(
        user,
        skillsetId,
        userSkill,
        welcomeResource
      )
    }

    return null
  }
}
