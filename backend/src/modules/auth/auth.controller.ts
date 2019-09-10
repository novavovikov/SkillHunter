import { Controller, Get, HttpException, HttpStatus, Next, Param, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiUseTags } from '@nestjs/swagger'
import { UserData } from '../../common/decorators/user.decorator'
import { AUTH_COOKIE_OPTIONS, BACK_URL } from './constants/auth'
import { RolesGuard } from '../../common/guards/roles.guard'
import { Roles } from '../../common/decorators/roles.decorator'
import { RoleType } from '../../constants/role-type'
import { UserService } from '../user/user.service'
import { HttpMessageType } from '../../constants/exception'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor (
    private userService: UserService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiUseTags('auth')
  googleAuth () {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiUseTags('auth')
  async googleCallback (
    @UserData() user,
    @Res() res,
    @Next() next,
  ): Promise<null> {
    res.cookie('authToken', user.token, AUTH_COOKIE_OPTIONS)
    res.redirect(BACK_URL)
    return null
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  @ApiUseTags('auth')
  facebookAuth () {}

  @Get(':userId')
  @UseGuards(RolesGuard)
  @Roles([RoleType.Admin])
  @UseGuards(AuthGuard('jwt'))
  @ApiUseTags('admin')
  async authByUserId (
    @Param('userId') userId: string
  ) {
    const user = await this.userService.findById(Number(userId))

    if (!user) {
      throw new HttpException({
        message: 'User does not exist',
        type: HttpMessageType.error,
        statusCode: HttpStatus.NOT_FOUND,
      }, HttpStatus.NOT_FOUND)
    }

    return AuthService.signPayload({
      id: user.id,
      googleId: user.googleId,
      facebookId: user.facebookId
    })
  }

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  @ApiUseTags('auth')
  async facebookCallback (
    @UserData() user,
    @Res() res,
    @Next() next,
  ): Promise<null> {
    res.cookie('authToken', user.token, AUTH_COOKIE_OPTIONS)
    res.redirect(BACK_URL)
    return null
  }
}
