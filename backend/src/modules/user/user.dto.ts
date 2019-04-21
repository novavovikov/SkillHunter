import { ApiModelProperty } from '@nestjs/swagger'

export class UserDto {
  @ApiModelProperty()
  readonly email: string

  @ApiModelProperty()
  readonly locale?: string

  @ApiModelProperty()
  readonly picture?: string

  @ApiModelProperty()
  readonly token?: string
}
