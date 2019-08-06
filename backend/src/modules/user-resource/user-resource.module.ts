import { HttpModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Resource } from '../resource/resource.entity'
import { ResourceService } from '../resource/resource.service'
import { Skill } from '../skill/skill.entity'
import { SkillService } from '../skill/skill.service'
import { Skillset } from '../skillset/skillset.entity'
import { SkillsetService } from '../skillset/skillset.service'
import { UserSkill } from '../user-skill/user-skill.entity'
import { UserSkillService } from '../user-skill/user-skill.service'
import { UserResourceController } from './user-resource.controller'
import { UserResource } from './user-resource.entity'
import { UserResourceService } from './user-resource.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserResource,
      UserSkill,
      Skillset,
      Skill,
      Resource,
    ]),
    HttpModule.register({
      timeout: 10000,
    }),
  ],
  controllers: [UserResourceController],
  providers: [
    UserSkillService,
    UserResourceService,
    SkillsetService,
    SkillService,
    ResourceService,
  ],
})
export class UserResourceModule {}
