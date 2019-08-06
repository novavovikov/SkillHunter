import { HttpModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Skill } from '../skill/skill.entity'
import { SkillService } from '../skill/skill.service'
import { Skillset } from '../skillset/skillset.entity'
import { SkillsetService } from '../skillset/skillset.service'
import { SuggestsController } from './suggests.controller'
import { SuggestsService } from './suggests.service'

@Module({
  imports: [
    HttpModule.register({
      timeout: 1500,
    }),
    TypeOrmModule.forFeature([Skillset, Skill]),
  ],
  controllers: [SuggestsController],
  providers: [
    SuggestsService,
    SkillService,
    SkillsetService
  ],
})
export class SuggestsModule {}
