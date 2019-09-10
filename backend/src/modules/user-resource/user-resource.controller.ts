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
import { HttpMessageType } from '../../constants/exception'
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
import { WELCOME_SKILL_NAME } from '../../constants/welcome'

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
  @ApiUseTags('user-resource')
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
    @UserData() user: User,
    @Param('skillsetId') skillsetId: string,
    @Query('skillIds') skillIds: string,
    @Query('limit') limit: string,
  ) {
    return this.userResourceService.getResourcesBulk(
      user,
      Number(skillsetId),
      skillIds.split(',').map(Number),
      limit
    )
  }

  @Get(':resourceId/content')
  @ApiUseTags('user-resource')
  @UseGuards(UserGuard)
  async getResourceContent (
    @Param('resourceId') resourceId: string,
    @UserData() user: User,
  ) {
    const userResource = await this.userResourceService.findById(resourceId, {
      join: {
        alias: 'userResource',
        leftJoinAndSelect: {
          resource: 'userResource.resource',
          skills: 'resource.skills',
        }
      },
    })

    if (!userResource) {
      throw new HttpException({
        message: 'The resource is not found',
        type: HttpMessageType.error,
        statusCode: HttpStatus.NOT_FOUND
      }, HttpStatus.NOT_FOUND)
    }

    if (user) {
      return getUserResourceWithLikedField(user.id, userResource)
    }

    const userResourceViewOnly = excludeFieldsFromObject(['status'], userResource)
    return {
      ...userResourceViewOnly,
      viewOnly: true,
      isAuthorized: false
    }
  }

  @Get(':skillsetId/:skillId')
  @ApiUseTags('user-resource')
  @UseGuards(AuthGuard('jwt'))
  async getResources (
    @UserData() user: User,
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
    @UserData() user: User,
    @Body('skillsetId') skillsetId: number,
    @Body('skillId') skillId: number,
    @Body('resourceId') resourceId: number,
    @Body('data') data: Partial<UserResource> = {},
  ) {
    const userSkillset = user.skillsets.find(({ id }) => id === skillsetId)

    if (!userSkillset) {
      throw new HttpException({
        message: `You don't have rights to edit this skillset`,
        type: HttpMessageType.error,
        statusCode: HttpStatus.BAD_REQUEST,
      }, HttpStatus.BAD_REQUEST)
    }

    const userSkill = await this.userSkillService.findById(skillId, {
      relations: ['userResources']
    })

    if (!userSkill) {
      throw new HttpException({
        message: 'The skill is not found',
        type: HttpMessageType.error,
        statusCode: HttpStatus.NOT_FOUND
      }, HttpStatus.NOT_FOUND)
    }

    const createdResource = userSkill.userResources.find(({ resource }) => resource.id === Number(resourceId))

    if (createdResource) {
      throw new HttpException({
        message: 'This skill has already have this resource',
        type: HttpMessageType.warning,
        statusCode: HttpStatus.BAD_REQUEST
      }, HttpStatus.BAD_REQUEST)
    }

    const resource: Resource = await this.resourceService.findById(resourceId)

    if (!resource) {
      throw new HttpException({
        message: 'The resource is not found',
        type: HttpMessageType.error,
        statusCode: HttpStatus.NOT_FOUND
      }, HttpStatus.NOT_FOUND)
    }

    const skillset: Skillset = await this.skillsetService.findById(skillsetId)

    if (!skillset) {
      throw new HttpException({
        message: 'The skillset is not found',
        type: HttpMessageType.error,
        statusCode: HttpStatus.NOT_FOUND
      }, HttpStatus.NOT_FOUND)
    }

    const resourceSkillRelation = await this.skillService.addResourceToSkill(userSkill.skill.id, resource)

    if (!resourceSkillRelation) {
      throw new HttpException({
        message: 'The skill is not found',
        type: HttpMessageType.error,
        statusCode: HttpStatus.NOT_FOUND
      }, HttpStatus.NOT_FOUND)
    }

    if (
      userSkill.skill.name === WELCOME_SKILL_NAME &&
      resource.accepted
    ) {
      await this.resourceService.update({ id: resource.id }, {
        accepted: false
      })
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
    @UserData() user: User,
    @Param('resourceId') resourceId: string,
    @Body() data: Partial<UserResource>,
  ) {
    const id = Number(resourceId)
    const { status } = data

    await this.userResourceService.updateResource(user, id, { status })

    return {
      id,
      ...data
    }
  }

  @Delete(':resourceId')
  @ApiUseTags('user-resource')
  @UseGuards(AuthGuard('jwt'))
  async removeResource (
    @UserData() user: User,
    @Param('resourceId') resourceId: string,
  ) {
    const userResource = await this.userResourceService.findOne({
      id: Number(resourceId),
      user,
    })

    if (!userResource) {
      throw new HttpException({
        message: 'The resource is not found',
        type: HttpMessageType.error,
        statusCode: HttpStatus.NOT_FOUND
      }, HttpStatus.NOT_FOUND)
    }

    await this.userResourceService.remove(userResource)
    return
  }
}
