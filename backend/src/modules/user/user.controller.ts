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
  Req,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiUseTags } from '@nestjs/swagger'
import { In } from 'typeorm'
import { Roles } from '../../common/decorators/roles.decorator'
import { RolesGuard } from '../../common/guards/roles.guard'
import { RoleType } from '../../constants/role-type'
import { unique } from '../../utils/unique'
import { Profession } from '../profession/profession.entity'
import { ProfessionService } from '../profession/profession.service'
import { Resource } from '../resource/resource.entity'
import { ResourceService } from '../resource/resource.service'
import { Skill } from '../skill/skill.entity'
import { SkillService } from '../skill/skill.service'
import { UserDto } from './user.dto'
import { UserService } from './user.service'

@Controller('user')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor (
    private userService: UserService,
    private skillService: SkillService,
    private professionService: ProfessionService,
    private resourceService: ResourceService,
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
    await this.userService.removeAllSkills(req.user)
    await this.userService.removeAllResources(req.user)
    return this.userService.delete(req.user.id)
  }

  @Get('skills/:professionId')
  @ApiUseTags('user')
  getSkills (
    @Req() req,
    @Param('professionId') professionId: number
  ) {
    return this.userService.getSkillsByProfessionId(req.user.id, professionId)
  }

  @Post('skills')
  @ApiUseTags('user')
  async adSkills (
    @Req() req,
    @Body('professionId') professionId: number,
    @Body('skills') skills: string[],
  ) {
    const skillList: Skill[] = await this.getSkillList(skills)

    return await this.userService.addSkills(
      req.user,
      professionId,
      skillList,
    )
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
  async getProfession (@Req() req) {
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

    const skillList: Skill[] = await this.getSkillList(skills)
    foundProfession.skills = unique([...foundProfession.skills, ...skillList])

    await this.userService.addProfession(req.user.id, foundProfession)
    return await this.userService.addSkills(
      req.user.id,
      foundProfession.id,
      skillList,
    )
  }

  @Get('resources/:professionId/:skillId')
  @ApiUseTags('user')
  async getResource (
    @Req() req,
    @Param('professionId') professionId: string,
    @Param('skillId') skillId: string,
  ) {
    return this.userService.getResourcesBySkillId(
      req.user.id,
      Number(professionId),
      Number(skillId)
    )
  }

  @Post('resource')
  @ApiUseTags('user')
  async addResource (
    @Req() req,
    @Body('professionId') professionId: number,
    @Body('skillId') skillId: number,
    @Body('resourceId') resourceId: number,
  ) {
    const resource: Resource = await this.resourceService.findById(resourceId)

    if (!resource) {
      return new HttpException('Resource not found', HttpStatus.BAD_REQUEST)
    }

    const profession: Profession = await this.professionService.findById(professionId)

    if (!profession) {
      return new HttpException('professionId  not found', HttpStatus.BAD_REQUEST)
    }

    const resourceSkillRelation = await this.skillService.addResourceToSkill(skillId, resource)

    if (!resourceSkillRelation) {
      return new HttpException('Skill not found', HttpStatus.BAD_REQUEST)
    }

    return this.userService.addResource(
      req.user,
      professionId,
      skillId,
      resource
    )
  }

  async getSkillList (skills: string[]) {
    let skillList: Skill[] = await this.skillService.find({
      name: In(skills),
    })

    if (skillList.length !== skills.length) {
      const notExistentSkills = skills.
        filter(item => !skillList.find(({ name }) => name === item)).
        map(name => ({ name }))
      const createdSkills: Skill[] = await this.skillService.setSkills(notExistentSkills)

      skillList = [...skillList, ...createdSkills]
    }

    return skillList
  }
}
