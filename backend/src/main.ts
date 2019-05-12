import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'

import { Logger } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './modules/app/app.module'

const env = process.env.NODE_ENV || 'dev'
const port = process.env.PORT

async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.use(cookieParser({
    secure: true,
    httpOnly: true
  }))

  if (env === 'dev') {
    const options = new DocumentBuilder().setTitle('Skillhunter').
      setDescription('Skill hunter API').
      setVersion('1.0')
      .build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('docs', app, document)
  }

  await app.listen(port)
  Logger.log(`Server running on http://backend:${port}`)
}

bootstrap()
