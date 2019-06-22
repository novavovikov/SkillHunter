import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiUseTags } from '@nestjs/swagger'
import { FindOneOptions, In } from 'typeorm'
import { RolesGuard } from '../../common/guards/roles.guard'
import { ResourceDto } from './resource.dto'
import { Resource } from './resource.entity'
import { ResourceService } from './resource.service'

@Controller('resource')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
export class ResourceController {
  constructor (
    private resourceService: ResourceService,
  ) {}

  @Get()
  @ApiUseTags('resource')
  getResources (
    @Query('ids') ids: string,
  ) {
    const query: FindOneOptions<Resource> = {}
    const resourceIds = ids && JSON.parse(ids)

    if (resourceIds) {
      query.where = {
        id: In(resourceIds),
      }
    }

    return this.resourceService.findAll(query)
  }

  @Post()
  @ApiUseTags('resource')
  async setResource (@Body() data: ResourceDto) {
    let resource = await this.resourceService.findByLink(data.link)

    if (!resource) {
      resource = await this.resourceService.getFromLink(data.link)

      return this.resourceService.create(resource)
    }

    return resource
  }

  @Post(':resourceId/like')
  @ApiUseTags('resource')
  async setResourceLike (@Param('resourceId') resourceId: string, @Req() req) {
    return await this.resourceService.setResourceLike(Number(resourceId), req.user)
  }

  @Delete(':resourceId/like')
  @ApiUseTags('resource')
  async removeResourceLike (@Param('resourceId') resourceId: string, @Req() req) {
    return await this.resourceService.removeResourceLike(Number(resourceId), req.user)
  }
}
