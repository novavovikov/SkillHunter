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
import { ApiImplicitBody, ApiUseTags } from '@nestjs/swagger'
import { In } from 'typeorm'
import { Roles } from '../../common/decorators/roles.decorator'
import { RolesGuard } from '../../common/guards/roles.guard'
import { RoleType } from '../../constants/role-type'
import { unique } from '../../utils/unique'
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
        'professions.skills'
      ]
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
  deleteUser (@Req() req) {
    return this.userService.delete(req.user.id)
  }

  @Get('skills')
  @ApiUseTags('user')
  async getSkills (@Req() req) {
    const { skills } = await this.userService.findById(req.user.id, {
      select: ['id'],
      relations: ['skills', 'skills.professions'],
    })

    return skills
  }

  @Post('skills')
  @ApiUseTags('user')
  @ApiImplicitBody({
    name: 'skill ids',
    type: [Number],
  })
  async setSkills (@Body() skills: string[], @Req() req) {
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

    return this.userService.setSkills(req.user.id, skillList)
  }

  @Delete('skills')
  @ApiUseTags('user')
  async deleteSkills (@Req() req) {
    return this.userService.setSkills(req.user.id, [])
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

    foundProfession.skills = unique([...foundProfession.skills, ...skillList])

    this.professionService.save(foundProfession)
    return this.userService.addProfession(req.user.id, foundProfession)
  }

  @Get('resources')
  @ApiUseTags('user')
  async getResource (@Req() req) {
    const resources = await this.userService.findById(req.user.id, {
      select: ['id'],
      relations: ['resources'],
    })

    return resources.resources.map((resource: Resource) => {
      const result = {
        ...resource,
        likes: resource.userIdsLikes.length,
        isLiked: resource.userIdsLikes.includes(req.user.id),
      }

      delete result.userIdsLikes

      return result
    })
  }

  @Post('resource')
  @ApiUseTags('user')
  async addResource (@Body('resourceId') resourceId: number | string, @Req() req) {
    const resource: Resource = await this.resourceService.findById(resourceId)

    if (!resource) {
      return new HttpException('Resource not found', HttpStatus.BAD_REQUEST)
    }

    return this.userService.addResource(req.user.id, resource)
  }
}
