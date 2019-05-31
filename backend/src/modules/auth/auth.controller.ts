import { Controller, Get, Next, Req, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiUseTags } from '@nestjs/swagger'
import { AUTH_COOKIE_OPTIONS, BACK_URL } from './constants/auth'

@Controller('auth')
@ApiUseTags('auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth () {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback (@Req() req, @Res() res, @Next() next): Promise<any> {
    res.cookie('authToken', req.user.token, AUTH_COOKIE_OPTIONS)
    res.redirect(BACK_URL)
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  facebookAuth () {}

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookCallback (@Req() req, @Res() res, @Next() next): Promise<any> {
    res.cookie('authToken', req.user.token, AUTH_COOKIE_OPTIONS)
    res.redirect(BACK_URL)
  }
}
