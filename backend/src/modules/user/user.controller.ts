import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiUseTags } from '@nestjs/swagger'
import { Roles } from '../../common/decorators/roles.decorator'
import { RolesGuard } from '../../common/guards/roles.guard'
import { RoleType } from '../../constants/role-type'
import { unique } from '../../utils/unique'
import { Skillset } from '../skillset/skillset.entity'
import { SkillsetService } from '../skillset/skillset.service'
import { Skill } from '../skill/skill.entity'
import { SkillService } from '../skill/skill.service'
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
  getCurrentUser (@Req() req) {
    return this.userService.findById(req.user.id, {
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
  updateUser (@Body() data: UserDto, @Req() req) {
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

    return this.userService.update(req.user.id, updatedData)
  }

  @Delete()
  @ApiUseTags('user')
  async deleteUser (@Req() req) {
    await this.userSkillService.removeAllSkills(req.user)
    await this.userResourceService.removeAllResources(req.user)
    return this.userService.delete(req.user.id)
  }

  @Get('skillsets')
  @ApiUseTags('user')
  async getSkillset (@Req() req): Promise<Skillset[]> {
    const { skillsets } = await this.userService.findById(req.user.id, {
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
    @Req() req,
  ) {
    const foundSkillset = await this.skillsetService.findByName(skillset, {
      relations: ['skills'],
    })

    const skillList: Skill[] = await this.skillService.getSkillList(skills)
    foundSkillset.skills = unique([...foundSkillset.skills, ...skillList])

    const updatedUser = await this.userService.addSkillset(req.user.id, foundSkillset)
    await this.userSkillService.addSkills(
      req.user.id,
      foundSkillset.id,
      skillList,
    )

    return updatedUser.skillsets
  }

  @Delete('skillset/:skillsetId')
  async removeSkillset (
    @Param('skillsetId') skillsetId: string,
    @Req() req
  ) {
    await this.userResourceService.removeResourcesBySkillsetId(req.user, Number(skillsetId))
    await this.userSkillService.removeSkillsBySkillsetId(req.user, Number(skillsetId))
    await this.userService.removeSkillset(req.user.id, Number(skillsetId))
  }
}
