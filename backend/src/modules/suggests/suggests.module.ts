import { HttpModule, Module } from '@nestjs/common'
import { ProfessionModule } from '../profession/profession.module'
import { ProfessionService } from '../profession/profession.service'
import { SkillModule } from '../skill/skill.module'
import { SkillService } from '../skill/skill.service'
import { SuggestsController } from './suggests.controller'
import { SuggestsService } from './suggests.service'

@Module({
  imports: [
    HttpModule.register({
      timeout: 500,
    }),
    SkillModule,
    ProfessionModule
  ],
  controllers: [SuggestsController],
  providers: [
    SuggestsService,
    SkillService,
    ProfessionService
  ],
})
export class SuggestsModule {}
