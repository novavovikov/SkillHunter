import { Body, Controller, Post } from '@nestjs/common'
import { TELEGRAM_BOT_ID } from './constants/telegram'
import { TelegramService } from './telegram.service'

@Controller(`telegram/${TELEGRAM_BOT_ID}`)
export class TelegramController {
  constructor (
    private telegramService: TelegramService,
  ) {}

  @Post()
  getOk (
    @Body() body,
  ) {
    console.log('message', body)
    this.telegramService.sendMessage(body.chatId, body.text)
  }
}
