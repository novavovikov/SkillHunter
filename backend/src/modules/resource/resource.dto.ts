import { ApiModelProperty } from '@nestjs/swagger'

export class ResourceDto {
  @ApiModelProperty()
  link: string
}
