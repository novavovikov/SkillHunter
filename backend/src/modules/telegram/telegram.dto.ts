import { ApiModelProperty } from '@nestjs/swagger'

export interface TelegramInitiatorDto {
  id: number
  is_bot: boolean
  first_name: string
  last_name: string
  username: string
  language_code: string
}

export interface TelegramChatDto {
  id: number
  first_name: string
  last_name: string
  username: string
  type: 'private'
}

export interface TelegramMessageDto {
  message_id: number
  date: number
  text: string
  from: TelegramInitiatorDto
  chat: TelegramChatDto
}

export interface TelegramCallbackQueryDto {
  id: string
  from: TelegramInitiatorDto
  message: TelegramMessageDto
  chat_instance: string
  data: string

  date: number
  text: string
  chat: TelegramChatDto
}

export class TelegramRequestDto {
  @ApiModelProperty()
  update_id: number

  @ApiModelProperty()
  callback_query?: TelegramCallbackQueryDto

  @ApiModelProperty()
  message?: TelegramMessageDto
}
