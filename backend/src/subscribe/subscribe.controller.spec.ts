import { Test, TestingModule } from '@nestjs/testing'
import { SubscribeController } from './subscribe.controller'

describe('Subscribe Controller', () => {
  let controller: SubscribeController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscribeController],
    }).compile()

    controller = module.get<SubscribeController>(SubscribeController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
