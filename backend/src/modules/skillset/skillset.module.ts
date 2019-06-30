import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SkillModule } from '../skill/skill.module'
import { SkillService } from '../skill/skill.service'
import { SkillsetController } from './skillset.controller'
import { Skillset } from './skillset.entity'
import { SkillsetService } from './skillset.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Skillset]),
    SkillModule,
  ],
  controllers: [SkillsetController],
  providers: [
    SkillsetService,
    SkillService,
  ],
})
export class SkillsetModule {}
