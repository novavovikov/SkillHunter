import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Skill } from '../skill/skill.entity'
import { SkillService } from '../skill/skill.service'
import { UserSkill } from '../user-skill/user-skill.entity'
import { UserSkillService } from '../user-skill/user-skill.service'
import { SkillsetController } from './skillset.controller'
import { Skillset } from './skillset.entity'
import { SkillsetService } from './skillset.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserSkill, Skillset, Skill])],
  controllers: [SkillsetController],
  providers: [UserSkillService, SkillsetService, SkillService],
})
export class SkillsetModule {}
