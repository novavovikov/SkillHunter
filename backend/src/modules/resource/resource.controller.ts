import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiUseTags } from '@nestjs/swagger'
import { FindOneOptions, In } from 'typeorm'
import { Roles } from '../../common/decorators/roles.decorator'
import { UserData } from '../../common/decorators/user.decorator'
import { RolesGuard } from '../../common/guards/roles.guard'
import { HttpMessageType } from '../../constants/exception'
import { RoleType } from '../../constants/role-type'
import { Resource } from './resource.entity'
import { ResourceService } from './resource.service'

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

  @Get(':resourceId/content')
  @ApiUseTags('resource')
  async getResourceContent (
    @Param('resourceId') resourceId: string
  ) {
    const resource = await this.resourceService.findById(Number(resourceId))

    return this.resourceService.getContentByLink(resource.link)
  }

  @Post('article|media|course')
  @UseGuards(AuthGuard('jwt'))
  @ApiUseTags('resource')
  async setResource (
    @Body('link') link: string,
  ) {
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

  @Delete(':resourceId/like')
  @UseGuards(AuthGuard('jwt'))
  @ApiUseTags('resource')
  async removeResourceLike (
    @Param('resourceId') resourceId: string,
    @UserData() user
  ) {
    return await this.resourceService.removeResourceLike(Number(resourceId), user)
  }
}
