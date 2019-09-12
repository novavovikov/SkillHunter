import { HttpModule, Module } from '@nestjs/common'
import { UserSettingsService } from './user-settings.service'
import { UserSettingsController } from './user-settings.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserSettings } from './user-settings.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserSettings,
    ]),
    HttpModule.register({
      timeout: 10000,
    }),
  ],
  providers: [UserSettingsService],
  controllers: [UserSettingsController],
})
export class UserSettingsModule {}
