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
import { FindOneOptions, In } from 'typeorm'
import { Roles } from '../../common/decorators/roles.decorator'
import { UserData } from '../../common/decorators/user.decorator'
import { RolesGuard } from '../../common/guards/roles.guard'
import { UserGuard } from '../../common/guards/user.guard'
import { HttpMessageType } from '../../constants/exception'
import { RoleType } from '../../constants/role-type'
import { User } from '../user/user.entity'
import { Resource } from './resource.entity'
import { ResourceService } from './resource.service'
import { SkillDto } from '../skill/skill.dto'
import { RESOURCES_BLACK_LIST } from '../../constants/resources'

@Controller('resource')
export class ResourceController {
  constructor (
    private resourceService: ResourceService,
  ) {}

  @Get()
  @ApiUseTags('resource')
  getResources (
    @Query('ids') ids?: string,
  ) {
    const query: FindOneOptions<Resource> = {}

    if (ids) {
      const resourceIds = ids.split(',')

      query.where = {
        id: In(resourceIds),
      }
    }

    return this.resourceService.findAll(query)
  }

  @Get('list')
  @ApiUseTags('resource')
  @UseGuards(RolesGuard)
  @Roles([RoleType.Admin])
  @UseGuards(AuthGuard('jwt'))
  getAllResources () {
    return this.resourceService.findAll()
  }

  @Get(':resourceId/refresh')
  @ApiUseTags('resource')
  @UseGuards(RolesGuard)
  @Roles([RoleType.Admin])
  @UseGuards(AuthGuard('jwt'))
 async updateResourceCache (
    @Param('resourceId') resourceId: string,
  ) {
    const id = Number(resourceId)
    const resource = await this.resourceService.findById(id)
    const receivedResource = await this.resourceService.getFromLink(resource.link)

    await this.resourceService.update({ id }, receivedResource)

    return receivedResource
  }

  @Get(':resourceId/content')
  @ApiUseTags('resource')
  @UseGuards(UserGuard)
  async getResourceContent (
    @Param('resourceId') resourceId: string,
    @UserData() user: User
  ) {
    const resource = await this.resourceService.findById(Number(resourceId))

    return this.resourceService.getContentByLink(resource.link)
  }

  @Post('article|media|course')
  @UseGuards(AuthGuard('jwt'))
  @ApiUseTags('resource')
  async setResource (
    @UserData() user: User,
    @Body('link') link: string,
  ) {
    if (user.role !== RoleType.Admin) {
      const url = new URL(link)

      for (const domain of RESOURCES_BLACK_LIST) {
        if (url.hostname.includes(domain)) {
          throw new HttpException({
            message: 'The resource is in the black list',
            type: HttpMessageType.warning,
            statusCode: HttpStatus.BAD_REQUEST,
          }, HttpStatus.BAD_REQUEST)
        }
      }
    }

    const foundResource: Resource = await this.resourceService.findOne({ link })

    if (foundResource) {
      return foundResource
    }

    const receivedResource = await this.resourceService.getFromLink(link)

    if (!receivedResource) {
      throw new HttpException({
        message: 'Resource not found',
        type: HttpMessageType.error,
        statusCode: HttpStatus.NOT_FOUND
      }, HttpStatus.NOT_FOUND)
    }

    return this.resourceService.create(receivedResource)
  }

  @Post('book')
  @UseGuards(AuthGuard('jwt'))
  @ApiUseTags('resource')
  async setBookResource (
    @Body('title') title: string,
    @Body('author') author: string,
  ) {
    let resource: Partial<Resource> = await this.resourceService.findOne({
      title,
      author: [author]
    })

    if (!resource) {
      resource = await this.resourceService.getBook(author, title)

      return this.resourceService.create(resource)
    }

    return resource
  }

  @Post(':resourceId/like')
  @UseGuards(AuthGuard('jwt'))
  @ApiUseTags('resource')
  async setResourceLike (@Param('resourceId') resourceId: string, @UserData() user) {
    return await this.resourceService.setResourceLike(Number(resourceId), user)
  }

  @Put(':resourceId')
  @UseGuards(AuthGuard('jwt'))
  @Roles([RoleType.Admin])
  @ApiUseTags('skill')
  async updateSkill (
    @Body() data: Partial<SkillDto>,
    @Param('resourceId') resourceId: string,
  ) {
    const id = Number(resourceId)
    await this.resourceService.update(id, data)

    return {
      id,
      ...data,
    }
  }

  @Delete(':resourceId/like')
  @UseGuards(AuthGuard('jwt'))
  @ApiUseTags('resource')
  async removeResourceLike (
    @Param('resourceId') resourceId: string,
    @UserData() user
  ) {
    return await this.resourceService.removeResourceLike(Number(resourceId), user)
  }

  @Delete(':resourceId')
  @UseGuards(AuthGuard('jwt'))
  @Roles([RoleType.Admin])
  @ApiUseTags('resource')
  async removeResource (
    @Param('resourceId') resourceId: string,
  ) {
    const resource = await this.resourceService.findById(Number(resourceId))
    return await this.resourceService.remove(resource)
  }
}
