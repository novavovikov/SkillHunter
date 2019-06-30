import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SkillsetModule } from '../skillset/skillset.module'
import { SkillsetService } from '../skillset/skillset.service'
import { ResourceModule } from '../resource/resource.module'
import { ResourceService } from '../resource/resource.service'
import { SkillModule } from '../skill/skill.module'
import { SkillService } from '../skill/skill.service'
import { UserResourceController } from './user-resource.controller'
import { UserResource } from './user-resource.entity'
import { UserResourceService } from './user-resource.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserResource,
    ]),
    SkillsetModule,
    SkillModule,
    ResourceModule,
  ],
  controllers: [UserResourceController],
  providers: [
    UserResourceService,
    SkillsetService,
    SkillService,
    ResourceService,
  ],
})
export class UserResourceModule {}
