import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UserData } from '../../common/decorators/user.decorator'
import { RolesGuard } from '../../common/guards/roles.guard'
import { User } from '../user/user.entity'
import { UserService } from '../user/user.service'
import { UserSettingsService } from './user-settings.service'
import { Roles } from '../../common/decorators/roles.decorator'
import { RoleType } from '../../constants/role-type'
import { ApiUseTags } from '@nestjs/swagger'

@Controller('user-settings')
@UseGuards(RolesGuard)
@ApiUseTags('user-settings')
@UseGuards(AuthGuard('jwt'))
export class UserSettingsController {
  constructor (
    private userService: UserService,
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

  @Put(':userId')
  @Roles([RoleType.Admin])
  async updateSettingsByUserId (
    @Param('userId') userId: string,
    @Body() data: any
  ) {
    const user = await this.userService.findById(Number(userId))

    return this.userSettingsService.update(user, data)
  }
}
