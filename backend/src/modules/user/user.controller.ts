import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiImplicitBody, ApiUseTags } from '@nestjs/swagger'
import { In } from 'typeorm'
import { Roles } from '../../common/decorators/roles.decorator'
import { RolesGuard } from '../../common/guards/roles.guard'
import { RoleType } from '../../constants/role-type'
import { Profession } from '../profession/profession.entity'
import { ProfessionService } from '../profession/profession.service'
import { Skill } from '../skill/skill.entity'
import { SkillService } from '../skill/skill.service'
import { UserDto } from './user.dto'
import { UserService } from './user.service'

@Controller('user')
@ApiUseTags('user')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor (
    private userService: UserService,
    private skillService: SkillService,
    private professionService: ProfessionService,
  ) {}

  @Get()
  getUsers () {
    return this.userService.findAll()
  }

  @Get('me')
  getCurrentUser (@Req() req) {
    return this.userService.findById(req.user.id)
  }

  @Put()
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

  @Put(':id')
  updateUserById (@Body() data: UserDto, @Param('id') id: number) {
    return this.userService.update(id, data)
  }

  @Delete()
  deleteUser (@Req() req) {
    return this.userService.delete(req.user.id)
  }

  @Post('skills')
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
  @Roles([RoleType.User])
  async deleteSkills (@Req() req) {
    return this.userService.setSkills(req.user.id, [])
  }

  @Delete('professions')
  @Roles([RoleType.User])
  async deleteProfessions (@Req() req) {
    return this.userService.setProfessions(req.user.id, [])
  }

  @Post('professions')
  @ApiImplicitBody({
    name: 'profession ids',
    type: [Number],
  })
  async setProfessions (@Body() professions: string[], @Req() req) {
    let professionList: Profession[] = await this.professionService.find({
      name: In(professions),
    })

    if (professionList.length !== professions.length) {
      const notExistentProfessions = professions.
        filter(item => !professionList.find(({ name }) => name === item)).
        map(name => ({ name }))
      const createdProfessions: Profession[] = await this.professionService.setProfessions(notExistentProfessions)

      professionList = [...professionList, ...createdProfessions]
    }

    return this.userService.setProfessions(req.user.id, professionList)
  }
}
