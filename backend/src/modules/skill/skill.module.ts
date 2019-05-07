import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SkillController } from './skill.controller'
import { SkillEntity } from './skill.entity'
import { SkillService } from './skill.service'

@Module({
  imports: [TypeOrmModule.forFeature([SkillEntity])],
  controllers: [SkillController],
  providers: [SkillService],
})
export class SkillModule {}
