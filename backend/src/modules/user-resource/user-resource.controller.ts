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
import { Resource } from '../resource/resource.entity'
import { ResourceService } from '../resource/resource.service'
import { SkillService } from '../skill/skill.service'
import { Skillset } from '../skillset/skillset.entity'
import { SkillsetService } from '../skillset/skillset.service'
import { UserSkillService } from '../user-skill/user-skill.service'
import { UserResource } from './user-resource.entity'
import { UserResourceService } from './user-resource.service'

@Controller('user-resource')
@UseGuards(RolesGuard)
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
  @UseGuards(AuthGuard('jwt'))
  async addResource (
    @Req() req,
    @Body('skillsetId') skillsetId: number,
    @Body('skillId') skillId: number,
    @Body('resourceId') resourceId: number,
    @Body('data') data: Partial<UserResource>,
  ) {
    const resource: Resource = await this.resourceService.findById(resourceId)

    if (!resource) {
      throw new HttpException('Resource not found', HttpStatus.BAD_REQUEST)
    }

    const skillset: Skillset = await this.skillsetService.findById(skillsetId)

    if (!skillset) {
      throw new HttpException('skillsetId  not found', HttpStatus.BAD_REQUEST)
    }

    const userSkill = await this.userSkillService.findById(skillId)

    if (!userSkill) {
      throw new HttpException('UserSkill not found', HttpStatus.BAD_REQUEST)
    }

    const resourceSkillRelation = await this.skillService.addResourceToSkill(userSkill.skill.id, resource)

    if (!resourceSkillRelation) {
      throw new HttpException('Skill not found', HttpStatus.BAD_REQUEST)
    }

    return this.userResourceService.addResource(
      req.user,
      skillsetId,
      userSkill,
      resource,
      data,
    )
  }

  @Get(':skillsetId')
  @ApiUseTags('user-resource')
  @UseGuards(AuthGuard('jwt'))
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

  @Get(':resourceId/content')
  @ApiUseTags('user-resource')
  @UseGuards(AuthGuard('jwt'))
  async getResourceContent (
    @Req() req,
    @Param('resourceId') resourceId: string,
  ) {
    console.log(123, req.headers)
    return this.userResourceService.findById(1, resourceId, {
      join: {
        alias: 'userResource',
        leftJoinAndSelect: {
          'resource': 'userResource.resource',
          'skills': 'resource.skills',
        },
      },
    })
  }

  @Get(':skillsetId/:skillId')
  @ApiUseTags('user-resource')
  @UseGuards(AuthGuard('jwt'))
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

  @Put(':resourceId')
  @ApiUseTags('user-resource')
  @UseGuards(AuthGuard('jwt'))
  async updateResource (
    @Req() req,
    @Param('resourceId') resourceId: string,
    @Body() data: Partial<UserResource>,
  ) {
    const id = Number(resourceId)
    const { status } = data
    await this.userResourceService.updateResource(id, { status })

    return {
      id,
      ...data,
    }
  }

  @Delete(':resourceId')
  @ApiUseTags('user-resource')
  @UseGuards(AuthGuard('jwt'))
  async removeResource (
    @Req() req,
    @Param('resourceId') resourceId: string,
  ) {
    return this.userResourceService.remove(Number(resourceId))
  }
}
