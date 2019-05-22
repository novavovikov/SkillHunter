import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
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

  @Get(':id')
  getUser (@Param('id') id: number) {
    return this.userService.findById(id)
  }

  @Put(':id')
  updateUser (@Body() data: UserDto, @Param('id') id: number) {
    return this.userService.update(id, data)
  }

  @Delete(':id')
  deleteUser (@Param('id') id: number) {
    return this.userService.delete(id)
  }

  @Post(':id/skills')
  @ApiImplicitBody({
    name: 'skill ids',
    type: [Number],
  })
  async setSkills ( @Body() skills: string[], @Param('id') id: string) {
    const skillList: Skill[] = await this.skillService.find({
      name: In(skills)
    })
    return this.userService.setSkills(id, skillList)
  }

  @Post(':id/professions')
  @ApiImplicitBody({
    name: 'profession ids',
    type: [Number],
  })
  async setProfessions (@Body() professions: string[], @Param('id') id: string) {
    const professionList: Profession[] = await this.professionService.find({
      name: In(professions)
    })

    return this.userService.setProfessions(id, professionList)
  }
}
