import { ApiModelProperty } from '@nestjs/swagger'

export class JwtPayloadDto {
  @ApiModelProperty()
  id: number

  @ApiModelProperty()
  googleId?: string

  @ApiModelProperty()
  facebookId?: string

  @ApiModelProperty()
  telegramId?: number

  @ApiModelProperty()
  iat?: number

  @ApiModelProperty()
  exp?: number
}
