import { HttpModule, Module } from '@nestjs/common'
import { ActivityController } from './activity.controller'
import { ActivityService } from './activity.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserResource } from '../user-resource/user-resource.entity'
import { UserResourceService } from '../user-resource/user-resource.service'
import { UserSkillService } from '../user-skill/user-skill.service'
import { UserSkill } from '../user-skill/user-skill.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserResource,
      UserSkill,
    ]),
    HttpModule.register({
      timeout: 10000,
    }),
  ],
  controllers: [ActivityController],
  providers: [
    ActivityService,
    UserResourceService,
    UserSkillService,
  ],
})
export class ActivityModule {}
