import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { Logger } from '@nestjs/common'

import { AppModule } from './modules/app/app.module'

const port = process.env.PORT

async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())
  app.setGlobalPrefix('api')
  await app.listen(port)
  Logger.log(`Server running on http://backend:${port}`)
}

bootstrap()
