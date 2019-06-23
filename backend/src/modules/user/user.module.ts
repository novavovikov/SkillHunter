import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProfessionModule } from '../profession/profession.module'
import { ProfessionService } from '../profession/profession.service'
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
    ProfessionModule,
    SkillModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserSkillService,
    UserResourceService,
    ProfessionService,
    SkillService,
  ],
})
export class UserModule {}
