import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProfessionModule } from '../profession/profession.module'
import { ProfessionService } from '../profession/profession.service'
import { ResourceModule } from '../resource/resource.module'
import { ResourceService } from '../resource/resource.service'
import { SkillModule } from '../skill/skill.module'
import { SkillService } from '../skill/skill.service'
import { UserController } from './user.controller'
import { User } from './user.entity'
import { UserService } from './user.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ProfessionModule,
    SkillModule,
    ResourceModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
    ProfessionService,
    SkillService,
    ResourceService
  ],
})
export class UserModule {}
