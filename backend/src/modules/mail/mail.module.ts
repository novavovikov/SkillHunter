import { Module } from '@nestjs/common'
import { join } from 'path'
import { MailerModule, PugAdapter } from '@nest-modules/mailer'
import { ServeStaticModule } from '@nestjs/serve-static'
import { MailService } from './mail.service'

const appName = process.env.APP_NAME
const server = process.env.SMTP_SERVER
const mail = process.env.MAIL
const password = process.env.MAIL_PASSWORD

@Module({
  imports: [
    MailerModule.forRoot({
      transport: `smtps://${mail}:${password}@${server}`,
      defaults: {
        from: `${appName} <${mail}>`,
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/templates`
    }),
  ],
  controllers: [],
  providers: [MailService],
})
export class MailModule {}
