import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
export class AuthController {
  @Get()
  @UseGuards(AuthGuard('jwt'))
  testAuth () {
    return {
      auth: true,
    }
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth () {}

  @Get('google/signIn')
  @UseGuards(AuthGuard('google'))
  async googleSignIn (@Req() req): Promise<any> {
    return req.user
  }
}
