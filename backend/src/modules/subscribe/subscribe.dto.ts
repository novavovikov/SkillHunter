import { IsEmail } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger'

export class SubscribeDto {
  @IsEmail()
  @ApiModelProperty({
    required: true
  })
  email: string

  @ApiModelProperty()
  profession: string

  @ApiModelProperty()
  expectations: string
}
