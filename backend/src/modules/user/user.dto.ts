import { ApiModelProperty } from '@nestjs/swagger'

export class UserDto {
  @ApiModelProperty()
  readonly email?: string

  @ApiModelProperty()
  readonly name?: string

  @ApiModelProperty()
  readonly locale?: string

  @ApiModelProperty()
  readonly picture?: string

  @ApiModelProperty()
  readonly googleId?: string

  @ApiModelProperty()
  readonly facebookId?: string
}
