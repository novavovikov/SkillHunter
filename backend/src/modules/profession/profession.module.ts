import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SkillModule } from '../skill/skill.module'
import { SkillService } from '../skill/skill.service'
import { ProfessionController } from './profession.controller'
import { Profession } from './profession.entity'
import { ProfessionService } from './profession.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Profession]),
    SkillModule,
  ],
  controllers: [ProfessionController],
  providers: [
    ProfessionService,
    SkillService,
  ],
})
export class ProfessionModule {}
