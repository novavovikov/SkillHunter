import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProfessionModule } from '../profession/profession.module'
import { ProfessionService } from '../profession/profession.service'
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
    ProfessionModule,
    SkillModule,
    ResourceModule,
  ],
  controllers: [UserResourceController],
  providers: [
    UserResourceService,
    ProfessionService,
    SkillService,
    ResourceService,
  ],
})
export class UserResourceModule {}
