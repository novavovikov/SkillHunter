import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ResourceModule } from '../resource/resource.module'
import { ResourceService } from '../resource/resource.service'
import { SkillModule } from '../skill/skill.module'
import { SkillService } from '../skill/skill.service'
import { UserSkillController } from './user-skill.controller'
import { UserSkill } from './user-skill.entity'
import { UserSkillService } from './user-skill.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserSkill,
    ]),
    SkillModule,
    ResourceModule,
  ],
  controllers: [UserSkillController],
  providers: [
    UserSkillService,
    SkillService,
    ResourceService,
  ],
})
export class UserSkillModule {}
