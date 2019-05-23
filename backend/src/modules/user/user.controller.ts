import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiImplicitBody, ApiUseTags } from '@nestjs/swagger'
import { In } from 'typeorm'
import { Profession } from '../profession/profession.entity'
import { ProfessionService } from '../profession/profession.service'
import { Skill } from '../skill/skill.entity'
import { SkillService } from '../skill/skill.service'
import { UserDto } from './user.dto'
import { UserService } from './user.service'

@Controller('user')
@ApiUseTags('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor (
    private userService: UserService,
    private skillService: SkillService,
    private professionService: ProfessionService,
  ) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getCurrentUser (@Req() req) {
    return this.userService.findById(req.user.id)
  }

  @Put()
  updateUser (@Body() data: UserDto, @Req() req) {
    return this.userService.update(req.user.id, data)
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
    const skillList: Skill[] = await this.skillService.find({
      name: In(skills),
    })
    return this.userService.setSkills(req.user.id, skillList)
  }

  @Post('professions')
  @ApiImplicitBody({
    name: 'profession ids',
    type: [Number],
  })
  async setProfessions (@Body() professions: string[], @Req() req) {
    const professionList: Profession[] = await this.professionService.find({
      name: In(professions),
    })

    return this.userService.setProfessions(req.user.id, professionList)
  }
}
