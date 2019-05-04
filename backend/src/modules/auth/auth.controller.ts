import { Controller, Get, Next, Req, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { BACK_URL } from './constants/auth'

@Controller('auth')
export class AuthController {
  @Get()
  @UseGuards(AuthGuard('jwt'))
  validateToken () {
    return {
      valid: true,
    }
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth () {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googlecallback (@Req() req, @Res() res, @Next() next): Promise<any> {
    res.cookie('authToken', req.user.token)
    res.redirect(BACK_URL)
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  facebookAuth () {}

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookcallback (@Req() req, @Res() res, @Next() next): Promise<any> {
    res.cookie('authToken', req.user.token)
    res.redirect(BACK_URL)
  }
}
