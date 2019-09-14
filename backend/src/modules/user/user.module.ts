import { HttpModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Skill } from '../skill/skill.entity'
import { SkillService } from '../skill/skill.service'
import { Skillset } from '../skillset/skillset.entity'
import { SkillsetService } from '../skillset/skillset.service'
import { UserResource } from '../user-resource/user-resource.entity'
import { UserResourceService } from '../user-resource/user-resource.service'
import { UserSkill } from '../user-skill/user-skill.entity'
import { UserSkillService } from '../user-skill/user-skill.service'
import { UserController } from './user.controller'
import { User } from './user.entity'
import { UserService } from './user.service'
import { Resource } from '../resource/resource.entity'
import { ResourceService } from '../resource/resource.service'
import { UserSettings } from '../user-settings/user-settings.entity'
import { UserSettingsService } from '../user-settings/user-settings.service'
import { MailService } from '../mail/mail.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserSettings,
      UserSkill,
      UserResource,
      Skillset,
      Skill,
      Resource,
    ]),
    HttpModule.register({
      timeout: 10000,
    }),
  ],
  controllers: [UserController],
  providers: [
    MailService,
    UserService,
    UserSettingsService,
    UserSkillService,
    UserResourceService,
    SkillsetService,
    SkillService,
    ResourceService,
  ],
})
export class UserModule {}
