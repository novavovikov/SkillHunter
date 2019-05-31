import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiUseTags } from '@nestjs/swagger'
import { Roles } from '../../common/decorators/roles.decorator'
import { RolesGuard } from '../../common/guards/roles.guard'
import { RoleType } from '../../constants/role-type'
import { ResourceDto } from './resource.dto'
import { ResourceService } from './resource.service'

@Controller('resource')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
export class ResourceController {
  constructor (
    private resourceService: ResourceService,
  ) {}

  @Get()
  @Roles([RoleType.Admin])
  @ApiUseTags('admin')
  getResources () {
    return this.resourceService.findAll()
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
    return await this.resourceService.setResourceLike(resourceId, req.user)
  }

  @Delete(':resourceId/like')
  @ApiUseTags('resource')
  async removeResourceLike (@Param('resourceId') resourceId: string, @Req() req) {
    return await this.resourceService.removeResourceLike(resourceId, req.user)
  }
}
