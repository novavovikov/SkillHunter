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
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiUseTags } from '@nestjs/swagger'
import { UserData } from '../../common/decorators/user.decorator'
import { RolesGuard } from '../../common/guards/roles.guard'
import { UserGuard } from '../../common/guards/user.guard'
import { excludeFieldsFromObject, getUserResourceWithLikedField } from '../../utils/normalizer'
import { Resource } from '../resource/resource.entity'
import { ResourceService } from '../resource/resource.service'
import { SkillService } from '../skill/skill.service'
import { Skillset } from '../skillset/skillset.entity'
import { SkillsetService } from '../skillset/skillset.service'
import { UserSkillService } from '../user-skill/user-skill.service'
import { User } from '../user/user.entity'
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

  @Get('search')
  @UseGuards(AuthGuard('jwt'))
  async findResources (
    @Query('q') q: string,
    @UserData() user: User,
  ) {
    if (q) {
      const userResources = await this.userResourceService.findByTitleResource(user.id, q)
      return userResources.map(userResource => getUserResourceWithLikedField(user.id, userResource))
    }

    return []
  }

  @Get(':skillsetId')
  @ApiUseTags('user-resource')
  @UseGuards(AuthGuard('jwt'))
  async getResourcesBulk (
    @UserData() user,
    @Param('skillsetId') skillsetId: string,
    @Query('skillIds') skillsIds: string,
  ) {
    return this.userResourceService.getResourcesBulk(
      user,
      Number(skillsetId),
      skillsIds.split(',').map(Number),
    )
  }

  @Get(':resourceId/content')
  @ApiUseTags('user-resource')
  @UseGuards(UserGuard)
  async getResourceContent (
    @Param('resourceId') resourceId: string,
    @UserData() user,
  ) {
    const userResource = await this.userResourceService.findById(resourceId, {
      join: {
        alias: 'userResource',
        leftJoinAndSelect: {
          'resource': 'userResource.resource',
          'skills': 'resource.skills',
        },
      },
    })

    if (user) {
      return getUserResourceWithLikedField(user.id, userResource)
    }

    const userResourceViewOnly = excludeFieldsFromObject(['status'], userResource)
    return {
      ...userResourceViewOnly,
      viewOnly: true
    }
  }

  @Get(':skillsetId/:skillId')
  @ApiUseTags('user-resource')
  @UseGuards(AuthGuard('jwt'))
  async getResources (
    @UserData() user,
    @Param('skillsetId') skillsetId: string,
    @Param('skillId') skillId: string,
  ) {
    return this.userResourceService.getResourcesBySkillId(
      user.id,
      Number(skillsetId),
      Number(skillId),
    )
  }

  @Post()
  @ApiUseTags('user-resource')
  @UseGuards(AuthGuard('jwt'))
  async addResource (
    @UserData() user,
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
      user,
      skillsetId,
      userSkill,
      resource,
      data,
    )
  }

  @Put(':resourceId')
  @ApiUseTags('user-resource')
  @UseGuards(AuthGuard('jwt'))
  async updateResource (
    @UserData() user,
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
    @UserData() user,
    @Param('resourceId') resourceId: string,
  ) {
    return this.userResourceService.remove(Number(resourceId))
  }
}
