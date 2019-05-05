import { HttpModule, Module } from '@nestjs/common'
import { SuggestsController } from './suggests.controller'
import { SuggestsService } from './suggests.service'

@Module({
  imports: [HttpModule],
  controllers: [SuggestsController],
  providers: [SuggestsService],
})
export class SuggestsModule {}
