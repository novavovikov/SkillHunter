import { HttpModule, Module } from '@nestjs/common'
import { User } from '../user/user.entity'
import { UserService } from '../user/user.service'
import { UserSettingsService } from './user-settings.service'
import { UserSettingsController } from './user-settings.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserSettings } from './user-settings.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserSettings,
    ]),
    HttpModule.register({
      timeout: 10000,
    }),
  ],
  providers: [
    UserSettingsService,
    UserService
  ],
  controllers: [UserSettingsController],
})
export class UserSettingsModule {}
