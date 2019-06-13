import { ApiModelProperty } from '@nestjs/swagger'

export class ProfessionDto {
  @ApiModelProperty()
  name: string

  @ApiModelProperty()
  accepted?: boolean
}
