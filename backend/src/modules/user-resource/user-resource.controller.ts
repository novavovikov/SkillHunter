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
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiUseTags } from '@nestjs/swagger'
import { RolesGuard } from '../../common/guards/roles.guard'
import { UserResourceStatusType } from '../../constants/status-type'
import { Resource } from '../resource/resource.entity'
import { ResourceService } from '../resource/resource.service'
import { SkillService } from '../skill/skill.service'
import { Skillset } from '../skillset/skillset.entity'
import { SkillsetService } from '../skillset/skillset.service'
import { UserSkill } from '../user-skill/user-skill.entity'
import { UserSkillService } from '../user-skill/user-skill.service'
import { UserResourceService } from './user-resource.service'

@Controller('user-resource')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
export class UserResourceController {
  constructor (
    private userResourceService: UserResourceService,
    private userSkillService: UserSkillService,
    private skillsetService: SkillsetService,
    private skillService: SkillService,
    private resourceService: ResourceService,
  ) {}

  @Post()
  @ApiUseTags('user-resource')
  async addResource (
    @Req() req,
    @Body('skillsetId') skillsetId: number,
    @Body('skillId') skillId: number,
    @Body('resourceId') resourceId: number,
  ) {
    const resource: Resource = await this.resourceService.findById(resourceId)

    if (!resource) {
      return new HttpException('Resource not found', HttpStatus.BAD_REQUEST)
    }

    const skillset: Skillset = await this.skillsetService.findById(skillsetId)

    if (!skillset) {
      return new HttpException('skillsetId  not found', HttpStatus.BAD_REQUEST)
    }

    const resourceSkillRelation = await this.skillService.addResourceToSkill(skillId, resource)

    if (!resourceSkillRelation) {
      return new HttpException('Skill not found', HttpStatus.BAD_REQUEST)
    }

    const userSkill = await this.userSkillService.findById(skillId)

    if (!userSkill) {
      return new HttpException('UserSkill not found', HttpStatus.BAD_REQUEST)
    }

    return this.userResourceService.addResource(
      req.user,
      skillsetId,
      userSkill,
      resource,
    )
  }

  @Get(':skillsetId')
  @ApiUseTags('user-resource')
  async getResourcesBulk (
    @Req() req,
    @Param('skillsetId') skillsetId: string,
    @Query('skillIds') skillsIds: string,
  ) {
    return this.userResourceService.getResourcesBulk(
      req.user,
      Number(skillsetId),
      skillsIds.split(',').map(Number),
    )
  }

  @Get(':skillsetId/:skillId')
  @ApiUseTags('user-resource')
  async getResources (
    @Req() req,
    @Param('skillsetId') skillsetId: string,
    @Param('skillId') skillId: string,
  ) {
    return this.userResourceService.getResourcesBySkillId(
      req.user.id,
      Number(skillsetId),
      Number(skillId),
    )
  }

  @Put(':skillsetId/:skillId/:resourceId')
  @ApiUseTags('user-resource')
  async updateResource (
    @Req() req,
    @Param('skillsetId') skillsetId: string,
    @Param('skillId') skillId: string,
    @Param('resourceId') resourceId: string,
    @Body('status') status: UserResourceStatusType,
  ) {
    const resource: Resource = await this.resourceService.findById(resourceId)

    if (!resource) {
      return new HttpException('Resource not found', HttpStatus.BAD_REQUEST)
    }

    const skillset: Skillset = await this.skillsetService.findById(skillsetId)

    if (!skillset) {
      return new HttpException('skillsetId  not found', HttpStatus.BAD_REQUEST)
    }

    const resourceSkillRelation = await this.skillService.addResourceToSkill(skillId, resource)

    if (!resourceSkillRelation) {
      return new HttpException('Skill not found', HttpStatus.BAD_REQUEST)
    }

    const userSkill = await this.userSkillService.findById(skillId)

    if (!userSkill) {
      return new HttpException('UserSkill not found', HttpStatus.BAD_REQUEST)
    }

    return this.userResourceService.updateResource(
      req.user,
      Number(skillsetId),
      userSkill,
      resource,
      {
        status,
      },
    )
  }

  @Delete(':skillsetId/:skillId/:resourceId')
  @ApiUseTags('user-resource')
  async removeResource (
    @Req() req,
    @Param('skillsetId') skillsetId: string,
    @Param('skillId') skillId: string,
    @Param('resourceId') resourceId: string,
  ) {
    const resource: Resource = await this.resourceService.findById(resourceId)
    const userSkill: UserSkill = await this.userSkillService.findById(skillId)

    return this.userResourceService.removeResourceBySkillId(
      req.user,
      Number(skillsetId),
      userSkill,
      resource,
    )
  }
}
