import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SkillsetModule } from '../skillset/skillset.module'
import { SkillsetService } from '../skillset/skillset.service'
import { ResourceModule } from '../resource/resource.module'
import { ResourceService } from '../resource/resource.service'
import { SkillModule } from '../skill/skill.module'
import { SkillService } from '../skill/skill.service'
import { UserSkillModule } from '../user-skill/user-skill.module'
import { UserSkillService } from '../user-skill/user-skill.service'
import { UserResourceController } from './user-resource.controller'
import { UserResource } from './user-resource.entity'
import { UserResourceService } from './user-resource.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserResource,
    ]),
    UserSkillModule,
    SkillsetModule,
    SkillModule,
    ResourceModule,
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
