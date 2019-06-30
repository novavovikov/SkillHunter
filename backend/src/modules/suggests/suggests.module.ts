import { HttpModule, Module } from '@nestjs/common'
import { SkillsetModule } from '../skillset/skillset.module'
import { SkillsetService } from '../skillset/skillset.service'
import { SkillModule } from '../skill/skill.module'
import { SkillService } from '../skill/skill.service'
import { SuggestsController } from './suggests.controller'
import { SuggestsService } from './suggests.service'

@Module({
  imports: [
    HttpModule.register({
      timeout: 1500,
    }),
    SkillModule,
    SkillsetModule
  ],
  controllers: [SuggestsController],
  providers: [
    SuggestsService,
    SkillService,
    SkillsetService
  ],
})
export class SuggestsModule {}
