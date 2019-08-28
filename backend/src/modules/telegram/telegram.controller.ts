import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common'
import { TELEGRAM_BOT_ID } from '../../constants/telegram'

@Controller(`telegram/${TELEGRAM_BOT_ID}`)
export class TelegramController {
  @Post()
  getOk (
    @Body() body,
  ) {
    console.log('message', body)
  }
}
