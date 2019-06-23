import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiUseTags } from '@nestjs/swagger'
import { Roles } from '../../common/decorators/roles.decorator'
import { RolesGuard } from '../../common/guards/roles.guard'
import { RoleType } from '../../constants/role-type'
import { unique } from '../../utils/unique'
import { Profession } from '../profession/profession.entity'
import { ProfessionService } from '../profession/profession.service'
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
    private professionService: ProfessionService,
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
        'professions',
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

    return this.userService.update(req.user.id, updatedData)
  }

  @Delete()
  @ApiUseTags('user')
  async deleteUser (@Req() req) {
    await this.userSkillService.removeAllSkills(req.user)
    await this.userResourceService.removeAllResources(req.user)
    return this.userService.delete(req.user.id)
  }

  @Delete('skills')
  @ApiUseTags('user')
  async deleteSkills (
    @Req() req,
    @Body('professionId') professionId: number,
    @Body('skillIds') skillIds: number[],
  ) {
    return null
  }

  @Get('professions')
  @ApiUseTags('user')
  async getProfession (@Req() req): Promise<Profession[]> {
    const { professions } = await this.userService.findById(req.user.id, {
      select: ['id'],
      relations: ['professions'],
    })

    return professions
  }

  @Post('profession')
  @ApiUseTags('user')
  async addInfo (
    @Body('profession') profession: string,
    @Body('skills') skills: string[],
    @Req() req,
  ) {
    const foundProfession = await this.professionService.findByName(profession, {
      relations: ['skills'],
    })

    const skillList: Skill[] = await this.skillService.getSkillList(skills)
    foundProfession.skills = unique([...foundProfession.skills, ...skillList])

    const updatedUser = await this.userService.addProfession(req.user.id, foundProfession)
    await this.userSkillService.addSkills(
      req.user.id,
      foundProfession.id,
      skillList,
    )

    return updatedUser.professions
  }
}
