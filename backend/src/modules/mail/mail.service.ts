import { Injectable, Logger } from '@nestjs/common'
import { ISendMailOptions, MailerService } from '@nest-modules/mailer'

@Injectable()
export class MailService {
  constructor (private readonly mailerService: MailerService) {}

  send ({ template, ...options }: ISendMailOptions) {
    if (options.to) {
      this
        .mailerService
        .sendMail({
          template: `${__dirname}/templates/${template}`, // The `.pug` extension is appended automatically.
          ...options,
        })
        .then((resp) => Promise.resolve(resp))
        .catch((e) => {
          Logger.error(`MailService.send: ${e}`)
        })
    }
  }
}
