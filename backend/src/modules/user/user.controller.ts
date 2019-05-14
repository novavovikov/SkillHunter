import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Profession } from '../profession/profession.entity'
import { ProfessionService } from '../profession/profession.service'
import { Skill } from '../skill/skill.entity'
import { SkillService } from '../skill/skill.service'
import { UserDto } from './user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor (
    private userService: UserService,
    private skillService: SkillService,
    private professionService: ProfessionService,
  ) {}

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getUser (@Param('id') id: number) {
    return this.userService.findById(id)
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  updateUser (@Body() data: Partial<UserDto>, @Param('id') id: number) {
    return this.userService.update(id, data)
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  deleteUser (@Param('id') id: number) {
    return this.userService.delete(id)
  }

  @Post(':id/skills')
  @UseGuards(AuthGuard('jwt'))
  async setSkills (@Body() skills: number[], @Param('id') id: string) {
    const skillList: Skill[] = await this.skillService.findByIds(skills)
    return this.userService.setSkills(id, skillList)
  }

  @Post(':id/professions')
  @UseGuards(AuthGuard('jwt'))
  async setProfessions (@Body() professions: number[], @Param('id') id: string) {
    const professionList: Profession[] = await this.professionService.findByIds(professions)
    return this.userService.setProfessions(id, professionList)
  }
}
