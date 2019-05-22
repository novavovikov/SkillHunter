import { ApiModelProperty } from '@nestjs/swagger'

export class SkillDto {
  @ApiModelProperty()
  id?: number

  @ApiModelProperty({
    required: true,
  })
  name: string
}
