import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UserData } from '../../common/decorators/user.decorator'
import { User } from '../user/user.entity'
import { UserSettingsService } from './user-settings.service'
import { Roles } from '../../common/decorators/roles.decorator'
import { RoleType } from '../../constants/role-type'
import { ApiUseTags } from '@nestjs/swagger'
import { UserDto } from '../user/user.dto'

@Controller('user-settings')
@ApiUseTags('user-settings')
@UseGuards(AuthGuard('jwt'))
export class UserSettingsController {
  constructor (
    private userSettingsService: UserSettingsService,
  ) {}

  @Get()
  getSettings (
    @UserData() user: User,
  ) {
    return this.userSettingsService.findByUser(user)
  }

  @Put()
  updateSettings (
    @UserData() user: User,
    @Body() data: any
  ) {
    return this.userSettingsService.update(user, data)
  }
}
