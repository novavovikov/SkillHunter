import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiUseTags } from '@nestjs/swagger'
import { Roles } from '../../common/decorators/roles.decorator'
import { UserData } from '../../common/decorators/user.decorator'
import { RolesGuard } from '../../common/guards/roles.guard'
import { RoleType } from '../../constants/role-type'
import { unique } from '../../utils/unique'
import { Skill } from '../skill/skill.entity'
import { SkillService } from '../skill/skill.service'
import { Skillset } from '../skillset/skillset.entity'
import { SkillsetService } from '../skillset/skillset.service'
import { UserResourceService } from '../user-resource/user-resource.service'
import { UserSkillService } from '../user-skill/user-skill.service'
import { UserDto } from './user.dto'
import { UserService } from './user.service'

@Controller('user')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor (
    private userService: UserService,
    private userSkillService: UserSkillService,
    private userResourceService: UserResourceService,
    private skillService: SkillService,
    private skillsetService: SkillsetService,
  ) {}

  @Get()
  @Roles([RoleType.Admin])
  @ApiUseTags('admin')
  getUsers () {
    return this.userService.findAll()
  }

  @Get('me')
  @ApiUseTags('user')
  getCurrentUser (@UserData() user) {
    return this.userService.findById(user.id, {
      select: [
        'id',
        'created',
        'role',
        'email',
        'picture',
        'name',
        'locale',
      ],
      relations: [
        'skillsets',
      ],
    })
  }

  @Put(':userId')
  @Roles([RoleType.Admin])
  @ApiUseTags('admin')
  updateUserById (@Body() data: UserDto, @Param('userId') userId: number) {
    return this.userService.update(userId, data)
  }

  @Put()
  @ApiUseTags('user')
  updateUser (@Body() data: UserDto, @UserData() user) {
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

    if (data.role) {
      updatedData.role = data.role
    }

    return this.userService.update(user.id, updatedData)
  }

  @Delete()
  @ApiUseTags('user')
  async deleteUser (@UserData() user) {
    await this.userResourceService.removeAllResources(user)
    await this.userSkillService.removeAllSkills(user)
    return this.userService.delete(user.id)
  }

  @Get('skillsets')
  @ApiUseTags('user')
  async getSkillset (@UserData() user): Promise<Skillset[]> {
    const { skillsets } = await this.userService.findById(user.id, {
      select: ['id'],
      relations: ['skillsets'],
    })

    return skillsets
  }

  @Post('skillset')
  @ApiUseTags('user')
  async addInfo (
    @Body('skillset') skillset: string,
    @Body('skills') skills: string[],
    @UserData() user,
  ) {
    if (user.skillsets.find(({ name }) => name === skillset)) {
      throw new HttpException('Skillset already exists', HttpStatus.BAD_REQUEST)
    }

    const foundSkillset = await this.skillsetService.findByName(skillset, {
      relations: ['skills'],
    })

    const skillList: Skill[] = await this.skillService.getSkillList(skills)
    foundSkillset.skills = unique([...foundSkillset.skills, ...skillList])

    const updatedUser = await this.userService.addSkillset(user.id, foundSkillset)
    await this.userSkillService.addSkills(
      user.id,
      foundSkillset.id,
      skillList,
    )

    return updatedUser.skillsets
  }

  @Delete('skillset/:skillsetId')
  async removeSkillset (
    @Param('skillsetId') skillsetId: string,
    @UserData() user
  ) {
    await this.userResourceService.removeResourcesBySkillsetId(user, Number(skillsetId))
    await this.userSkillService.removeSkillsBySkillsetId(user, Number(skillsetId))
    await this.userService.removeSkillset(user.id, Number(skillsetId))
  }
}
