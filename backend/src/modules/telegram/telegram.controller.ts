import { Controller, Get, Param, Query } from '@nestjs/common'
import { TELEGRAM_BOT_ID } from './constants/telegram'
import { TelegramService } from './telegram.service'

@Controller(`telegram/${TELEGRAM_BOT_ID}`)
export class TelegramController {
  constructor (
    private telegramService: TelegramService,
  ) {}

  @Get(':method')
  getOk (
    @Param('method') method: string,
    @Query() query,
  ) {
    this.telegramService.sendEvent(method, query)
  }
}
