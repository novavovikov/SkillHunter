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
import { HttpMessageType } from '../../constants/exception'
import { RoleType } from '../../constants/role-type'
import { User } from '../user/user.entity'
import { Resource } from './resource.entity'
import { ResourceService } from './resource.service'
import { SkillDto } from '../skill/skill.dto'

@Controller('resource')
export class ResourceController {
  constructor(private resourceService: ResourceService) {}

  @Get()
  @ApiUseTags('resource')
  getResources(@Query('ids') ids?: string) {
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
  @UseGuards(RolesGuard)
  @Roles([RoleType.Admin])
  @UseGuards(AuthGuard('jwt'))
  @ApiUseTags('admin')
  getAllResources() {
    return this.resourceService.findAll()
  }

  @Get(':resourceId/refresh')
  @UseGuards(RolesGuard)
  @Roles([RoleType.Admin])
  @UseGuards(AuthGuard('jwt'))
  @ApiUseTags('admin')
  async updateResourceCache(@Param('resourceId') resourceId: string) {
    const id = Number(resourceId)
    const resource = await this.resourceService.findOne({ id })
    const receivedResource = await this.resourceService.getFromLink(
      resource.link
    )

    await this.resourceService.update({ id }, receivedResource)

    return receivedResource
  }

  @Post('article|media|course')
  @UseGuards(AuthGuard('jwt'))
  @ApiUseTags('resource')
  async setResource(@UserData() user: User, @Body('link') link: string) {
    const isValid =
      user.role === RoleType.Admin ||
      this.resourceService.validateResourceLink(link)

    if (!isValid) {
      throw new HttpException(
        {
          message: `The resources from this website are forbidden`,
          type: HttpMessageType.warning,
          statusCode: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST
      )
    }

    const createdResource = await this.resourceService.createByLink(link)
    if (!createdResource) {
      throw new HttpException(
        {
          message:
            'There were some problems while adding this resource.\nPlease contact us.',
          type: HttpMessageType.error,
          statusCode: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND
      )
    }

    return createdResource
  }

  @Post('book')
  @UseGuards(AuthGuard('jwt'))
  @ApiUseTags('resource')
  async setBookResource(
    @Body('title') title: string,
    @Body('author') author: string
  ) {
    let resource: Partial<Resource> = await this.resourceService.findOne({
      title,
      author: [author],
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
  async setResourceLike(
    @Param('resourceId') resourceId: string,
    @UserData() user
  ) {
    return await this.resourceService.setResourceLike(Number(resourceId), user)
  }

  @Put(':resourceId')
  @UseGuards(AuthGuard('jwt'))
  @Roles([RoleType.Admin])
  @ApiUseTags('admin')
  async updateSkill(
    @Body() data: Partial<SkillDto>,
    @Param('resourceId') resourceId: string
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
  async removeResourceLike(
    @Param('resourceId') resourceId: string,
    @UserData() user
  ) {
    return await this.resourceService.removeResourceLike(
      Number(resourceId),
      user
    )
  }

  @Delete(':resourceId')
  @UseGuards(AuthGuard('jwt'))
  @Roles([RoleType.Admin])
  @ApiUseTags('admin')
  async removeResource(@Param('resourceId') resourceId: string) {
    const resource = await this.resourceService.findOne({ id: Number(resourceId) })
    return this.resourceService.remove(resource)
  }
}
