import { IsEmail } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger'

export class SubscribeDto {
  @IsEmail()
  @ApiModelProperty({
    required: true,
  })
  email: string

  @ApiModelProperty()
  skillset: string

  @ApiModelProperty()
  expectations: string
}
