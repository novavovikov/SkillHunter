import { IsEmail } from 'class-validator'

export class SubscribeDto {
  @IsEmail()
  email: string
  profession: string
  specializations: string
}
