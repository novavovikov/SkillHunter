import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Skill } from '../skill/skill.entity'
import { SkillService } from '../skill/skill.service'
import { SkillsetController } from './skillset.controller'
import { Skillset } from './skillset.entity'
import { SkillsetService } from './skillset.service'

@Module({
  imports: [TypeOrmModule.forFeature([Skillset, Skill])],
  controllers: [SkillsetController],
  providers: [
    SkillsetService,
    SkillService,
  ],
})
export class SkillsetModule {}
