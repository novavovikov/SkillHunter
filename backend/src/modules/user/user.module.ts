import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SkillsetModule } from '../skillset/skillset.module'
import { SkillsetService } from '../skillset/skillset.service'
import { SkillModule } from '../skill/skill.module'
import { SkillService } from '../skill/skill.service'
import { UserResource } from '../user-resource/user-resource.entity'
import { UserResourceService } from '../user-resource/user-resource.service'
import { UserSkill } from '../user-skill/user-skill.entity'
import { UserSkillService } from '../user-skill/user-skill.service'
import { UserController } from './user.controller'
import { User } from './user.entity'
import { UserService } from './user.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserSkill,
      UserResource,
    ]),
    SkillsetModule,
    SkillModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserSkillService,
    UserResourceService,
    SkillsetService,
    SkillService,
  ],
})
export class UserModule {}
