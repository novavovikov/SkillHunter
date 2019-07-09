import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiUseTags } from '@nestjs/swagger'
import { FindOneOptions, In } from 'typeorm'
import { Roles } from '../../common/decorators/roles.decorator'
import { RolesGuard } from '../../common/guards/roles.guard'
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
  @UseGuards(RolesGuard)
  @Roles([RoleType.Admin])
  @UseGuards(AuthGuard('jwt'))
  getAllResources () {
    return this.resourceService.findAll()
  }

  @Get()
  @ApiUseTags('resource')
  getResources (
    @Query('ids') ids: string,
  ) {
    const query: FindOneOptions<Resource> = {}
    const resourceIds = ids.split(',')

    if (resourceIds) {
      query.where = {
        id: In(resourceIds),
      }
    }

    return this.resourceService.findAll(query)
  }

  @Post('article|media|course')
  @UseGuards(AuthGuard('jwt'))
  @ApiUseTags('resource')
  async setResource (
    @Body('link') link: string,
  ) {
    let resource: Partial<Resource> = await this.resourceService.findOne({ link })

    if (!resource) {
      resource = await this.resourceService.getFromLink(link)

      return this.resourceService.create(resource)
    }

    return resource
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
  async setResourceLike (@Param('resourceId') resourceId: string, @Req() req) {
    return await this.resourceService.setResourceLike(Number(resourceId), req.user)
  }

  @Delete(':resourceId/like')
  @UseGuards(AuthGuard('jwt'))
  @ApiUseTags('resource')
  async removeResourceLike (@Param('resourceId') resourceId: string, @Req() req) {
    return await this.resourceService.removeResourceLike(Number(resourceId), req.user)
  }
}
