import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ResourceModule } from '../resource/resource.module'
import { ResourceService } from '../resource/resource.service'
import { SkillModule } from '../skill/skill.module'
import { SkillService } from '../skill/skill.service'
import { UserResourceModule } from '../user-resource/user-resource.module'
import { UserResourceService } from '../user-resource/user-resource.service'
import { UserSkillController } from './user-skill.controller'
import { UserSkill } from './user-skill.entity'
import { UserSkillService } from './user-skill.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserSkill,
    ]),
    forwardRef(() => UserResourceModule),
    SkillModule,
    ResourceModule,
  ],
  controllers: [UserSkillController],
  providers: [
    UserSkillService,
    UserResourceService,
    SkillService,
    ResourceService,
  ],
})
export class UserSkillModule {}
