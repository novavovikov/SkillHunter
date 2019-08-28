import { Controller, Get } from '@nestjs/common'
import { TELEGRAM_BOT_ID } from '../../constants/telegram'

@Controller(`telegram/${TELEGRAM_BOT_ID}`)
export class TelegramController {
  @Get()
  getOk(): string {
    return 'str'
  }
}
