import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { SubscribeService } from './subscribe.service'
import { SubscribeDto } from './subscribe.dto'
import { ValidationPipe } from '../../utils/validation.pipe'

@Controller('subscribe')
export class SubscribeController {
  constructor (private subscribeService: SubscribeService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createSubscriber (@Body() data: SubscribeDto) {
    return this.subscribeService.create(data)
  }
}
