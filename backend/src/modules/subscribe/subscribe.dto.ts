import { IsEmail } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger'

export class SubscribeDto {
  @IsEmail()
  @ApiModelProperty()
  email: string

  @ApiModelProperty()
  profession: string

  @ApiModelProperty()
  specializations: string
}
