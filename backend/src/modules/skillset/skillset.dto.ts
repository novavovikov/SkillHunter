import { ApiModelProperty } from '@nestjs/swagger'

export class SkillsetDto {
  @ApiModelProperty()
  name: string

  @ApiModelProperty()
  accepted?: boolean
}
