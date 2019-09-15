import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Skill } from '../skill/skill.entity'
import { SkillService } from '../skill/skill.service'
import { Skillset } from '../skillset/skillset.entity'
import { SkillsetService } from '../skillset/skillset.service'
import { UserResource } from '../user-resource/user-resource.entity'
import { UserResourceService } from '../user-resource/user-resource.service'
import { UserSkillController } from './user-skill.controller'
import { UserSkill } from './user-skill.entity'
import { UserSkillService } from './user-skill.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSkill, UserResource, Skillset, Skill]),
  ],
  controllers: [UserSkillController],
  providers: [
    UserSkillService,
    UserResourceService,
    SkillsetService,
    SkillService,
  ],
})
export class UserSkillModule {}
