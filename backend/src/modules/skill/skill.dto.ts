import { ApiModelProperty } from '@nestjs/swagger'

export class SkillDto {
  @ApiModelProperty()
  externalId: string

  @ApiModelProperty()
  name: string
}
