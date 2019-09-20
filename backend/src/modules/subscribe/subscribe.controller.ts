import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiUseTags } from '@nestjs/swagger'
import { Roles } from '../../common/decorators/roles.decorator'
import { RolesGuard } from '../../common/guards/roles.guard'
import { RoleType } from '../../constants/role-type'
import { SubscribeService } from './subscribe.service'
import { SubscribeDto } from './subscribe.dto'
import { ValidationPipe } from '../../common/pipes/validation.pipe'
import { UserData } from '../../common/decorators/user.decorator'
import { User } from '../user/user.entity'
import { HttpMessageType } from '../../constants/exception'

@Controller('subscribe')
@UseGuards(AuthGuard('jwt'))
export class SubscribeController {
  constructor(private subscribeService: SubscribeService) {}

  @Get('list')
  @Roles([RoleType.Admin])
  @UseGuards(RolesGuard)
  @ApiUseTags('admin')
  getSubscribers () {
    return this.subscribeService.findAll({
      order: {
        id: 'DESC',
      },
      relations: ['user']
    })
  }

  @Get()
  @ApiUseTags('subscribe')
  async getSubscribe (
    @UserData() user: User,
  ) {
    const subscribe = await this.subscribeService.findOne({ user })

    if (!subscribe) {
      throw new HttpException(
        {
          message: 'The subscribe is not found',
          type: HttpMessageType.error,
          statusCode: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND
      )
    }

    return subscribe
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiUseTags('subscribe')
  createSubscriber (
    @Body() data: SubscribeDto,
    @UserData() user: User,
  ) {
    return this.subscribeService.create({
      ...data,
      user,
    })
  }

  @Delete(':subscribeId')
  @Roles([RoleType.Admin])
  @ApiUseTags('admin')
  async removeSubscribe(@Param('subscribeId') subscribeId: string) {
    const subscribe = await this.subscribeService.findOne({ id: Number(subscribeId) })
    return this.subscribeService.remove(subscribe)
  }
}
