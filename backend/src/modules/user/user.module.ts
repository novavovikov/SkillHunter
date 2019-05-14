import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProfessionModule } from '../profession/profession.module'
import { ProfessionService } from '../profession/profession.service'
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
  ],
  controllers: [UserController],
  providers: [
    UserService,
    ProfessionService,
    SkillService,
  ],
})
export class UserModule {}
