import { ApiModelProperty } from '@nestjs/swagger'
import { RoleType } from '../../constants/role-type'

export class UserDto {
  @ApiModelProperty()
  email?: string

  @ApiModelProperty()
  name?: string

  @ApiModelProperty()
  locale?: string

  @ApiModelProperty()
  picture?: string

  @ApiModelProperty()
  readonly googleId?: string

  @ApiModelProperty()
  readonly facebookId?: string

  @ApiModelProperty()
  role?: RoleType

  @ApiModelProperty()
  telegramId?: number
}
