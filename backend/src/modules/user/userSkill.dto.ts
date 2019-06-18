import { ApiModelProperty } from '@nestjs/swagger'
import { Skill } from '../skill/skill.entity'

export class UserSkillDto {
  @ApiModelProperty()
  userId: number

  @ApiModelProperty()
  professionId: number

  @ApiModelProperty()
  skills: Skill[]
}
