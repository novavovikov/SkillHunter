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
import { isUrl } from '../../utils/url'

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

    return tokenData.telegramId
  }

  @Post(TELEGRAM_BOT_ID)
  async getData (
    @Body() body,
    @Body('message') message: TelegramMessageDto,
  ) {
    console.log(2, body)
    const { from, chat, text } = message

    if (from.is_bot) {
      return this.telegramService.sendEvent('sendMessage', {
        chat_id: chat.id,
        text: 'Bot not supported',
      })
    }
    const telegramId = from.id
    const user = await this.userService.findOne({ telegramId })

    if (!user) {
      const token = AuthService.signPayload({
        id: -1,
        telegramId,
      }, {
        expiresIn: '2m',
      })

      const link = `[link](https://app.skillhunter.io/auth?token=${token})`

      return this.telegramService.sendEvent('sendMessage', {
        chat_id: chat.id,
        text: `User is not found. Login by clicking on the ${link}`,
        parse_mode: 'Markdown',
      })
    }

    if (isUrl(text)) {
      return this.telegramService.sendEvent('sendMessage', {
        chat_id: chat.id,
        text: `Choose skillset`,
        reply_markup: {
          keyboard: user.skillsets.map(({ name, id }) => [{
            text: name,
            callback_data: JSON.stringify({
              resourceLink: text,
              skillsetId: id
            })
          }]),
        }
      })
    }

    this.telegramService.sendEvent('sendMessage', {
      chat_id: chat.id,
      text: `Your name - ${from.first_name} ${from.last_name}`,
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
