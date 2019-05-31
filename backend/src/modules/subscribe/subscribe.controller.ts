import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiUseTags } from '@nestjs/swagger'
import { Roles } from '../../common/decorators/roles.decorator'
import { RolesGuard } from '../../common/guards/roles.guard'
import { RoleType } from '../../constants/role-type'
import { SubscribeService } from './subscribe.service'
import { SubscribeDto } from './subscribe.dto'
import { ValidationPipe } from '../../common/pipes/validation.pipe'

@Controller('subscribe')
export class SubscribeController {
  constructor (private subscribeService: SubscribeService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiUseTags('subscribe')
  createSubscriber (@Body() data: SubscribeDto) {
    return this.subscribeService.create(data)
  }

  @Get()
  @ApiUseTags('admin')
  @Roles([RoleType.Admin])
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  getSubscribers () {
    return this.subscribeService.findAll()
  }
}
