import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { TELEGRAM_BOT_ID } from './constants/telegram'
import { TelegramService } from './telegram.service'
import { TelegramMessageDto } from './telegram.dto'
import { UserService } from '../user/user.service'
import { AuthService } from '../auth/auth.service'

@Controller(`telegram/${TELEGRAM_BOT_ID}`)
export class TelegramController {
  constructor (
    private telegramService: TelegramService,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post()
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
      const token = AuthService.signPayload({
        id: -1,
        telegramId,
      })

      const domain = process.env.NODE_ENV === 'prod'
        ? 'http://localhost:3000'
        : 'https://app.skilhunter.io'

      return this.telegramService.sendEvent('sendMessage', {
        chat_id: message.chat.id,
        text: `User is not found. Login by clicking on the link`,
      })
    }

    console.log('user', user)
    console.log('message', message)
    this.telegramService.sendEvent('sendMessage', {
      chat_id: message.chat.id,
      text: `Your name - ${message.from.first_name} ${message.from.last_name}`,
    })
  }

  @Post(':method')
  sendEvent (
    @Param('method') method: string,
    @Body() params: any,
  ) {
    this.telegramService.sendEvent(method, params)
  }
}
