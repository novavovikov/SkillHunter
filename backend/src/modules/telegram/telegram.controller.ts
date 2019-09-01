import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common'
import { TELEGRAM_BOT_ID } from './constants/telegram'
import { TelegramService } from './telegram.service'
import { TelegramMessageDto } from './telegram.dto'
import { UserService } from '../user/user.service'
import { AuthService } from '../auth/auth.service'
import { UserData } from '../../common/decorators/user.decorator'
import { User } from '../user/user.entity'
import { AuthGuard } from '@nestjs/passport'
import { HttpMessageType } from '../../constants/exception'
import { JwtPayloadDto } from '../auth/Jwt-payload.dto'

@Controller(`telegram`)
export class TelegramController {
  constructor (
    private telegramService: TelegramService,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Get('auth/:token')
  @UseGuards(AuthGuard('jwt'))
  async auth (
    @UserData() user: User,
    @Param('token') token: string,
  ) {
    const tokenData = AuthService.verifyToken(token) as JwtPayloadDto

    if (!tokenData || !tokenData.telegramId) {
      throw new HttpException({
        message: `Token invalid`,
        type: HttpMessageType.warning,
        statusCode: HttpStatus.BAD_REQUEST,
      }, HttpStatus.BAD_REQUEST)
    }

    if (user.telegramId) {
      throw new HttpException({
        message: `This user has got\n a telegram account`,
        type: HttpMessageType.warning,
        statusCode: HttpStatus.BAD_REQUEST,
      }, HttpStatus.BAD_REQUEST)
    }

    await this.userService.update(user.id, {
      telegramId: tokenData.telegramId,
    })

    this.telegramService.sendEvent('sendMessage', {
      chat_id: tokenData.telegramId,
      text: `Welcome, ${user.name}`,
    })
  }

  @Post(TELEGRAM_BOT_ID)
  async getData (
    @Body('message') message: TelegramMessageDto,
  ) {
    if (message.from.is_bot) {
      return this.telegramService.sendEvent('sendMessage', {
        chat_id: message.chat.id,
        text: 'Bot not supported',
      })
    }
    const telegramId = message.from.id
    const user = await this.userService.findOne({ telegramId })

    if (!user) {
      // TODO изменить время жизни токена на 2 мин
      const token = AuthService.signPayload({
        id: -1,
        telegramId,
      })

      const domain = process.env.NODE_ENV === 'prod'
        ? 'https://app.skilhunter.io'
        : 'http://localhost:3000'

      const link = 'link'.link(`${domain}/auth?token=${token}`)

      // TODO сделать нормальное отображение ссылки
      return this.telegramService.sendEvent('sendMessage', {
        chat_id: message.chat.id,
        text: `User is not found. Login by clicking on the ${link}`,
        parse_mode: 'HTML',
      })
    }

    console.log('user', user)
    console.log('message', message)
    this.telegramService.sendEvent('sendMessage', {
      chat_id: message.chat.id,
      text: `Your name - ${message.from.first_name} ${message.from.last_name}`,
    })
  }

  @Post(`${TELEGRAM_BOT_ID}/:method`)
  sendEvent (
    @Param('method') method: string,
    @Body() params: any,
  ) {
    this.telegramService.sendEvent(method, params)
  }
}
