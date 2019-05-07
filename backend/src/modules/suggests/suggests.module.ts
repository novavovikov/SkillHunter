import { HttpModule, Module } from '@nestjs/common'
import { SkillModule } from '../skill/skill.module'
import { SkillService } from '../skill/skill.service'
import { SuggestsController } from './suggests.controller'
import { SuggestsService } from './suggests.service'

@Module({
  imports: [
    HttpModule,
    SkillModule
  ],
  controllers: [SuggestsController],
  providers: [SuggestsService, SkillService],
})
export class SuggestsModule {}
