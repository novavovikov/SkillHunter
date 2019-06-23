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
import { RolesGuard } from '../../common/guards/roles.guard'
import { UserResourceStatusType } from '../../constants/status-type'
import { Profession } from '../profession/profession.entity'
import { ProfessionService } from '../profession/profession.service'
import { Resource } from '../resource/resource.entity'
import { ResourceService } from '../resource/resource.service'
import { SkillService } from '../skill/skill.service'
import { UserResourceService } from './user-resource.service'

@Controller('user-resource')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
export class UserResourceController {
  constructor (
    private userResourceService: UserResourceService,
    private professionService: ProfessionService,
    private skillService: SkillService,
    private resourceService: ResourceService,
  ) {}

  @Post()
  @ApiUseTags('user-resource')
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

    return this.userResourceService.addResource(
      req.user,
      professionId,
      skillId,
      resource,
    )
  }

  @Post(':professionId')
  @ApiUseTags('user-resource')
  async getResourcesBulk (
    @Req() req,
    @Param('professionId') professionId: string,
    @Body() skillsIds: number[],
  ) {
    return this.userResourceService.getResourcesBulk(
      req.user,
      Number(professionId),
      skillsIds,
    )
  }

  @Get(':professionId/:skillId')
  @ApiUseTags('user-resource')
  async getResources (
    @Req() req,
    @Param('professionId') professionId: string,
    @Param('skillId') skillId: string,
  ) {
    return this.userResourceService.getResourcesBySkillId(
      req.user.id,
      Number(professionId),
      Number(skillId),
    )
  }

  @Put(':professionId/:skillId/:resourceId')
  @ApiUseTags('user-resource')
  async updateResource (
    @Req() req,
    @Param('professionId') professionId: string,
    @Param('skillId') skillId: string,
    @Param('resourceId') resourceId: string,
    @Body('status') status: UserResourceStatusType,
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

    return this.userResourceService.updateResource(
      req.user,
      Number(professionId),
      Number(skillId),
      resource,
      {
        status,
      },
    )
  }

  @Delete(':professionId/:skillId/:resourceId')
  @ApiUseTags('user-resource')
  async removeResource (
    @Req() req,
    @Param('professionId') professionId: string,
    @Param('skillId') skillId: string,
    @Param('resourceId') resourceId: string,
  ) {
    const resource: Resource = await this.resourceService.findById(resourceId)

    return this.userResourceService.removeResourceBySkillId(
      req.user,
      Number(professionId),
      Number(skillId),
      resource,
    )
  }
}
