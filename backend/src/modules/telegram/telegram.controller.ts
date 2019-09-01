import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { TELEGRAM_BOT_ID } from './constants/telegram'
import { TelegramService } from './telegram.service'

@Controller(`telegram/${TELEGRAM_BOT_ID}`)
export class TelegramController {
  constructor (
    private telegramService: TelegramService,
  ) {}

  @Get(':method')
  sendEvent (
    @Param('method') method: string,
    @Query() query,
  ) {
    this.telegramService.sendEvent(method, query)
  }

  @Post()
  getData (
    @Body() body,
  ) {
    console.log('message', body)
    this.telegramService.sendEvent('sendMessage', {
      chat_id: body.message.chat.id,
      text: 'Я принял!!!'
    })
  }
}
